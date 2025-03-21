import Profile from '../../components/Profile/Profile';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './BoxerDetails.css';
const BoxerDetail = () => {
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
