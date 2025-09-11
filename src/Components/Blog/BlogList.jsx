// src/Components/Blog/BlogList.jsx
import React, { useState, useEffect } from 'react';
import BlogCreate from './BlogCreate';
import BlogItem from './BlogItem';
import './Blog.css';
const API_URL = import.meta.env.VITE_API_URL;


function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(` ${API_URL}/api/blogs`);
      if (response.ok) {
        const blogsData = await response.json();
        setBlogs(blogsData);
      } else {
        setError('Failed to fetch blogs');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
  };

  const handleBlogCreated = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  const handleBlogDeleted = (blogId) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId));
  };

  const handleBlogUpdated = (updatedBlog) => {
    setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)));
  };

  return (
    <div className="blog-container">
      <BlogCreate onBlogCreated={handleBlogCreated} />
      {error && <div className="error-message">{error}</div>}
      <div className="blog-list">
        {blogs.length === 0 ? (
          <p>No blogs yet. Be the first to post!</p>
        ) : (
          blogs.map(blog => (
            <BlogItem 
              key={blog.id} 
              blog={blog} 
              onBlogDeleted={handleBlogDeleted}
              onBlogUpdated={handleBlogUpdated}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default BlogList;


