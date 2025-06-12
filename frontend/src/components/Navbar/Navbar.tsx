import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { FaUser } from 'react-icons/fa';
import logo from '../../images/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name);
    }
  }, []);

  const handleToggleMenu = () => setToggleMenu(!toggleMenu);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
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
              {userName ? (
                <div className="admin-sidebar">
                  <p className="login-text">{userName}</p>
                  <FaUser
                    className="admin-icon"
                    onClick={handleLogout}
                    title="Logout"
                  />
                </div>
              ) : (
                <a className="admin-sidebar" href="/login">
                  <p className="login-text">Login</p>
                  <FaUser className="admin-icon" />
                </a>
              )}
            </div>
          </ul>
        </div>
        <div className="relative nav-admin-desktop">
          {userName ? (
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <p className="mt-1 text-white login-text">{userName}</p>
              <FaUser className="ml-2.5 text-white admin-icon" />
            </div>
          ) : (
            <a className="admin-desktop" href="/login">
              <p className="login-text">Login</p>
              <FaUser className="admin-icon" />
            </a>
          )}

          {showDropdown && userName && (
            <div className="absolute right-0 z-10 w-32 mt-2 text-sm text-[#8c8f98] bg-[#272e3c] rounded shadow">
              <button
                className="block w-full px-4 py-2 text-left cursor-pointer hover:text-red-400"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
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
