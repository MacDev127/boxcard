import React from 'react';
import './Footer.css';
import { FaFacebookF } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer>
      <div className="footer__socials">
        <FaFacebookF size={20} className="icon" />
        <FaInstagram size={20} className="icon" />
        <FaTiktok size={20} className="icon" />
        <FaXTwitter size={20} className="icon" />
      </div>
      <p>2025. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
