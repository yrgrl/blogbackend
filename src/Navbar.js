import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser, toggleDarkMode, darkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <nav>
      <div className="nav-main">
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {user ? (
          <>
            <Link to="/create" onClick={() => setMenuOpen(false)}>Create Post</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}
        <button onClick={() => { toggleDarkMode(); setMenuOpen(false); }}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;