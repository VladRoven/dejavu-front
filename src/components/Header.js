import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="logo">
        <h1>DejaVu Wales</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link to="/">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/">Our Catalogue</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
      <div className="btn">
        <button type="button" onClick={() => navigate('/sign-in')}>
          Login
        </button>
      </div>
    </div>
  );
};
export default Header;
