import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import './Navbar.css';
import { useState } from 'react';
import logo from '../../images/logo.png';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <nav>
      <div className="logo">
        <a href="/">
          <img src={logo} alt="" />
        </a>
      </div>

      <div>
        <ul id="navbar" className={`nav-links ${toggleMenu ? 'active' : ''}`}>
          <li>
            <a href="#" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="/boxers">Boxers</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div>
        <a href="/dashboard">
          <PersonIcon />
        </a>
      </div>
      <div className="mobile">
        {toggleMenu ? (
          <CloseIcon onClick={handleToggleMenu} />
        ) : (
          <MenuIcon onClick={handleToggleMenu} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
