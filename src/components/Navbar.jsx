import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './navbar-styles.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const favCount = useSelector((state) => state.fav.favs.length);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar-custom ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <NavLink  to="/home">
          Films Community
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink to="/home" className="nav-link-custom" activeClassName="active" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className="nav-link-custom" activeClassName="active" exact>
              Register
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="nav-link-custom" activeClassName="active" exact>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className="nav-link-custom" exact>
              Favorites {favCount > 0 && <span className="badge">{favCount}</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
