// src/Components/Blog/BlogItem.jsx
import React, { useState } from 'react';
import { FaHeart, FaTrash, FaComment } from 'react-icons/fa';
import './Blog.css';


function BlogItem({ blog, onBlogDeleted, onBlogUpdated }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showDelete, setShowDelete] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const isOwner = user && user.id === blog.authorId;
  const isLiked = user && blog.likes.some(like => like.userId === user.id);

  const handleLike = async () => {
    if (!user) return;
    const token = localStorage.getItem('token');

    // 👉 Optimistic update
    const newLikes = isLiked
      ? blog.likes.filter(like => like.userId !== user.id)
      : [...blog.likes, { userId: user.id }];
    onBlogUpdated({ ...blog, likes: newLikes });

    try {
      const response = await fetch(`https://xdevs-hub.onrender.com/api/blogs/${blog.id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        onBlogUpdated(updatedBlog); // sync with backend
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !user) return;
    const token = localStorage.getItem('token');

    // 👉 Optimistic update
    const tempComment = {
      id: Date.now(),
      author: { username: user.username },
      content: commentText
    };
    onBlogUpdated({ ...blog, comments: [...blog.comments, tempComment] });
    setCommentText('');

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blog.id}/comment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: commentText })
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        onBlogUpdated(updatedBlog); // sync with backend
      }
    } catch (error) {
      console.error('Comment error:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blog.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        onBlogDeleted(blog.id);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div 
      className="blog-item"
      onMouseEnter={() => setShowDelete(isOwner)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="blog-header">
        <h3>{blog.title}</h3>
        {showDelete && (
          <button 
            className="delete-btn"
            onClick={handleDelete}
            title="Delete blog"
          >
            <FaTrash />
          </button>
        )}
      </div>
      <p className="blog-author">By {blog.author.username}</p>
      <p className="blog-content">{blog.content}</p>
      
      {blog.media && (
        <div className="blog-media">
          {blog.media.match(/\.(jpeg|jpg|gif|png)$/i) ? (
            <img src={`http://localhost:5000/uploads/${blog.media}`} alt="Blog media" />
          ) : (
            <video controls>
              <source src={`http://localhost:5000/uploads/${blog.media}`} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
      
      <div className="blog-actions">
        <button 
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          disabled={!user}
        >
          <FaHeart /> {blog.likes.length}
        </button>
        <button 
          className="comment-btn"
          onClick={() => setShowComments(!showComments)}
          disabled={!user}
        >
          <FaComment /> {blog.comments.length}
        </button>
      </div>
      
      {showComments && (
        <div className="comments-section">
          <h4>Comments</h4>
          {blog.comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <div className="comments-list">
              {blog.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <strong>{comment.author.username}:</strong> {comment.content}
                </div>
              ))}
            </div>
          )}
          {user && (
            <form onSubmit={handleComment} className="comment-form">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
              />
              <button type="submit">Post</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default BlogItem;

