import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar-styles.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-custom fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <NavLink className="navbar-brand navbar-brand-custom" to="/">
          Movie<span style={{ color: '#fff' }}>Hub</span>
        </NavLink>
        
        <button
          className="navbar-toggler navbar-toggler-custom"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon navbar-toggler-icon-custom" />
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link nav-link-custom"
                activeClassName="active"
                to="/home"
              >
                <i className="bi bi-house-door me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link nav-link-custom"
                activeClassName="active"
                to="/register"
              >
                <i className="bi bi-person-plus me-1"></i> Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link nav-link-custom"
                activeClassName="active"
                to="/login"
              >
                <i className="bi bi-box-arrow-in-right me-1"></i> Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                className="nav-link nav-link-custom"
                activeClassName="active"
                to="/favorites"
              >
                <i className="bi bi-heart me-1"></i> Favorites
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;