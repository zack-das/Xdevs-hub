// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Footer from './Components/Footer/Footer';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import BlogList from './Components/Blog/BlogList';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => setUser(userData);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="content-wrap">
          <Routes>
            {/* Always visible */}
            <Route path="/" element={<Home />} />

            {!user ? (
              <>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
                {/* Redirect all other pages to home if not logged in */}
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/about" element={<About />} />
                <Route path="/blogs" element={<ProtectedRoute><BlogList /></ProtectedRoute>} />
                {/* opinions, leadership, trackers can go here too */}
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

