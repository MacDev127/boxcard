import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Footer from '../../components/footer/Footer';
import './Home.css';
const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
