// src/Components/Navbar/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  return (
    <nav>
      <h1>XDevs</h1>
      <ul>
        <li><Link className="listItem" to="/">Home</Link></li>
        {user && (
          <>
            <li><Link className="listItem" to="/about">About</Link></li>
            <li><Link className="listItem" to="/blogs">Blogs</Link></li>
            <li><Link className="listItem" to="/opinions">Opinions</Link></li>
            <li><Link className="listItem" to="/leadership">Leadership</Link></li>
            <li><Link className="listItem" to="/trackers">Trackers</Link></li>
          </>
        )}
      </ul>
      <div className="auth-section">
        {user ? (
          <div className="user-info">
            <span>Welcome, {user.username}</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/signup" className="auth-link signup">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


