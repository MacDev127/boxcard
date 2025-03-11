import './Hero.css';
import SearchIcon from '@mui/icons-material/Search';
import banner from '../../images/banner.png';
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__banner">
        <img src={banner} alt="" />
      </div>
      <div className="hero__input-container">
        <input type="text" placeholder="Find a Fighter" />
        <button type="submit">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default Hero;
