// src/Components/Blog/BlogCreate.jsx
import React, { useState } from 'react';
import './Blog.css';
const API_URL = import.meta.env.VITE_API_URL;

function BlogCreate({ onBlogCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media: null
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        media: file
      });

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const token = localStorage.getItem('token');
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (formData.media) {
      data.append('media', formData.media);
    }

    try {
      const response = await fetch(`${API_URL}/api/blogs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      if (response.ok) {
        const newBlog = await response.json();
        onBlogCreated(newBlog); // instant add to UI
        setFormData({ title: '', content: '', media: null });
        setPreview(null);
        document.getElementById('media').value = '';
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create blog');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-create">
      <h3>Create a New Blog Post</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="content"
            placeholder="What's on your mind?"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="media">Add Image or Video (optional)</label>
          <input
            type="file"
            id="media"
            name="media"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          {preview && (
            <div className="media-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </div>
  );
}

export default BlogCreate;


