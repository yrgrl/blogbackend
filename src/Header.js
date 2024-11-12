
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="app-title-container">
      <div className="app-title-circle">
          <span className="app-title">The</span>
          <span className="app-title">Digital</span>
          <span className="app-title">Diary</span>
        </div>
      </Link>
    </header>
  );
}

export default Header;