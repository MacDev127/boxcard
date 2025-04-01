import { useEffect } from 'react';

import Profile from '../../components/Profile/Profile';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './BoxerDetails.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BoxerDetail = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <>
      <div className="boxer-details">
        <Navbar />
        <Profile />
      </div>
      <Footer />
    </>
  );
};

export default BoxerDetail;
