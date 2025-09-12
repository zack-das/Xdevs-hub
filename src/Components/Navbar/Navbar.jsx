import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

function Navbar({ user, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <nav>
      <h1>XDevs</h1>

      {/* Desktop menu */}
      <ul className="desktop-only">
        {user && (
          <>
            <li><Link className="listItem" to="/">Home</Link></li>
            <li><Link className="listItem" to="/about">About</Link></li>
            <li><Link className="listItem" to="/blogs">Blogs</Link></li>
            <li><Link className="listItem" to="/contact">Contact Us</Link></li>
          </>
        )}
      </ul>

      {/* Auth (desktop only) */}
      <div className="auth-section desktop-only">
        {user ? (
          <div className="user-info">
            <span>Welcome, {user?.username || "Guest"}</span>
            <button onClick={onLogout} className="logout-btn">
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/signup" className="auth-link signup">Sign Up</Link>
          </div>
        )}
      </div>

      {/* Mobile hamburger */}
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar overlay */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
        <ul>
          {user && (
            <>
              <li><Link onClick={closeSidebar} className="listItem" to="/">Home</Link></li>
              <li><Link onClick={closeSidebar} className="listItem" to="/about">About</Link></li>
              <li><Link onClick={closeSidebar} className="listItem" to="/blogs">Blogs</Link></li>
              <li><Link onClick={closeSidebar} className="listItem" to="/contact">Contact Us</Link></li>
            </>
          )}
        </ul>

        {/* Auth (mobile sidebar) */}
        <div className="auth-section">
          {user ? (
            <div className="user-info">
              <span>Welcome, {user?.username || "Guest"}</span>
              <button onClick={() => { onLogout(); closeSidebar(); }} className="logout-btn">
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link onClick={closeSidebar} to="/login" className="auth-link">Login</Link>
              <Link onClick={closeSidebar} to="/signup" className="auth-link signup">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
// src/Components/Navbar/Navbar.jsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

// function Navbar({ user, onLogout }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
//   const closeSidebar = () => setIsSidebarOpen(false);

//   return (
//     <nav>
//       <h1>XDevs</h1>

//       {/* Desktop menu */}
//       <ul className="desktop-only">
//         {user && (
//           <>
//             <li><Link className="listItem" to="/">Home</Link></li>
//             <li><Link className="listItem" to="/about">About</Link></li>
//             <li><Link className="listItem" to="/blogs">Blogs</Link></li>
//             <li><Link className="listItem" to="/contact">Contact Us</Link></li>
//           </>
//         )}
//       </ul>

//       {/* Auth (desktop only) */}
//       <div className="auth-section desktop-only">
//         {user ? (
//           <div className="user-info">
//             <span>Welcome, {user?.username || "Guest"}</span>
//             <button onClick={onLogout} className="logout-btn">
//               <FaSignOutAlt />
//             </button>
//           </div>
//         ) : (
//           <div className="auth-links">
//             <Link to="/login" className="auth-link">Login</Link>
//             <Link to="/signup" className="auth-link signup">Sign Up</Link>
//           </div>
//         )}
//       </div>

//       {/* Mobile hamburger */}
//       <button className="mobile-menu-btn" onClick={toggleSidebar}>
//         <FaBars />
//       </button>

//       {/* Sidebar */}
//       <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//         <button className="close-btn" onClick={closeSidebar}>
//           <FaTimes />
//         </button>
//         <ul>
         
//           {user && (
//             <>
//               <li><Link onClick={closeSidebar} className="listItem" to="/">Home</Link></li>
//               <li><Link onClick={closeSidebar} className="listItem" to="/about">About</Link></li>
//               <li><Link onClick={closeSidebar} className="listItem" to="/blogs">Blogs</Link></li>
//                <li><Link onClick={closeSidebar} className="listItem" to="/contact">Contact Us</Link></li>
//             </>
//           )}
//         </ul>

//         {/* Auth (mobile sidebar) */}
//         <div className="auth-section">
//           {user ? (
//             <div className="user-info">
//               <span>Welcome, {user?.username || "Guest"}</span>
//               <button onClick={() => { onLogout(); closeSidebar(); }} className="logout-btn">
//                 <FaSignOutAlt />
//               </button>
//             </div>
//           ) : (
//             <div className="auth-links">
//               <Link onClick={closeSidebar} to="/login" className="auth-link">Login</Link>
//               <Link onClick={closeSidebar} to="/signup" className="auth-link signup">Sign Up</Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
