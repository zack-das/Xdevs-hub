import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

const allowedOrigins = [
  "http://localhost:5173", // vite default
  "https://xdevs-hub-1.onrender.com", // if you sometimes run there
  process.env.FRONTEND_ORIGIN, // production frontend
].filter(Boolean); // remove undefined

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // if you use cookies later
}));

app.use(express.json());

// ensure uploads dir exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
// serve uploaded files
app.use("/uploads", express.static("uploads"));

const SECRET = process.env.JWT_SECRET || "supersecret";

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, SECRET, (err, payload) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = payload; // { id, email }
    next();
  });
}

// ================= AUTH =================

// Signup
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "username, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // check both email and username
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
      select: { id: true, email: true, username: true },
    });

    if (existing) {
      if (existing.email === email) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (existing.username === username) {
        return res.status(400).json({ error: "Username already taken" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
      select: { id: true, username: true, email: true },
    });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Signup error:", error);

    // Prisma unique constraint
    if (error.code === "P2002") {
      const fields = Array.isArray(error.meta?.target) ? error.meta.target : [error.meta?.target].filter(Boolean);
      if (fields.includes("email")) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (fields.includes("username")) {
        return res.status(400).json({ error: "Username already taken" });
      }
      return res.status(400).json({ error: "Duplicate field value" });
    }

    res.status(500).json({ error: "Signup failed" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ error: "email and password are required" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// ================= BLOGS =================

// Get all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: { select: { id: true, username: true } },
        comments: { include: { author: { select: { username: true } } } },
        likes: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(blogs);
  } catch (error) {
    console.error("Fetch blogs error:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Create blog
app.post("/api/blogs", authenticateToken, upload.single("media"), async (req, res) => {
  const { title, content } = req.body;
  try {
    if (!title || !content) return res.status(400).json({ error: "title and content are required" });

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        media: req.file ? req.file.filename : null,
        authorId: req.user.id,
      },
      include: { author: { select: { id: true, username: true } }, comments: true, likes: true },
    });
    res.json(blog);
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// Like/unlike blog
app.post("/api/blogs/:id/like", authenticateToken, async (req, res) => {
  const blogId = Number(req.params.id);
  try {
    const existingLike = await prisma.like.findFirst({
      where: { blogId, userId: req.user.id },
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
    } else {
      await prisma.like.create({ data: { blogId, userId: req.user.id } });
    }

    // ✅ Return updated blog instead of just message
    const updatedBlog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        author: { select: { id: true, username: true } },
        comments: { include: { author: { select: { username: true } } } },
        likes: true,
      },
    });

    res.json(updatedBlog);
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ error: "Failed to like/unlike blog" });
  }
});

// Comment on blog
app.post("/api/blogs/:id/comment", authenticateToken, async (req, res) => {
  const blogId = Number(req.params.id);
  const { content } = req.body;
  try {
    if (!content) return res.status(400).json({ error: "content is required" });

    await prisma.comment.create({
      data: { content, blogId, authorId: req.user.id },
    });

    // ✅ Return updated blog with new comments
    const updatedBlog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        author: { select: { id: true, username: true } },
        comments: { include: { author: { select: { username: true } } } },
        likes: true,
      },
    });

    res.json(updatedBlog);
  } catch (error) {
    console.error("Comment error:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

// Delete blog
app.delete("/api/blogs/:id", authenticateToken, async (req, res) => {
  const blogId = Number(req.params.id);
  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });
    if (!blog || blog.authorId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.blog.delete({ where: { id: blogId } });
    res.json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
