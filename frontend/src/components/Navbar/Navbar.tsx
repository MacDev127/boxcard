import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { FaUser } from 'react-icons/fa';
import './Navbar.css';
import { useState } from 'react';
import logo from '../../images/logo.png';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const location = useLocation();

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
        </div>

        <div className="desktop-links">
          <ul id="navbar" className={`nav-links ${toggleMenu ? 'active' : ''}`}>
            <li>
              <a href="/" className={location.pathname === '/' ? 'active' : ''}>
                Home
              </a>
            </li>
            <li>
              <a
                href="/boxers"
                className={location.pathname === '/boxers' ? 'active' : ''}
              >
                Boxers
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className={location.pathname === '/contact' ? 'active' : ''}
              >
                Contact
              </a>
            </li>
            <div className="nav-admin-sidebar">
              <a className="admin-sidebar" href="/dashboard/analytics">
                <p className="login-text">Login</p>

                <FaUser className="admin-icon" />
              </a>
            </div>
          </ul>
        </div>

        <div className="nav-admin-desktop">
          <a className="admin-desktop" href="/dashboard/analytics">
            <p className="login-text">Login</p>

            <FaUser className="admin-icon" />
          </a>
        </div>

        <div className="mobile">
          {toggleMenu ? (
            <CloseIcon
              onClick={handleToggleMenu}
              style={{ fontSize: '28px' }}
            />
          ) : (
            <MenuIcon onClick={handleToggleMenu} style={{ fontSize: '28px' }} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
