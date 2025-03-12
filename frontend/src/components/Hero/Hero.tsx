import { useState, useEffect } from 'react';
import './Hero.css';
import SearchIcon from '@mui/icons-material/Search';
import banner from '../../images/banner.png';
import axios from 'axios';

interface Boxer {
  id: number;
  name: string;
}

const Hero = () => {
  const [searchBoxer, setSearchBoxer] = useState('');
  const [boxerList, setBoxerList] = useState<Boxer[]>([]);
  const [filteredBoxers, setFilteredBoxers] = useState<Boxer[]>([]);

  useEffect(() => {
    fetchBoxers();
  }, []);

  const fetchBoxers = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/boxers');
      setBoxerList(response.data);
      setFilteredBoxers(response.data); // initialize filtered list
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchBoxer(inputValue);

    // dynamically filter boxers
    const filtered = boxerList.filter((boxer) =>
      boxer.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredBoxers(filtered);
  };

  return (
    <div className="hero">
      <div className="hero__banner">
        <img src={banner} alt="" />
        <div className="hero__input-container">
          <div className="hero__input-wrapper">
            <SearchIcon className="hero__search-icon" />
            <input
              type="text"
              placeholder="Find a Boxer"
              value={searchBoxer}
              onChange={handleInputChange}
            />
            {searchBoxer.trim().length > 0 && filteredBoxers.length > 0 && (
              <ul className="hero__results">
                {filteredBoxers.map((boxer) => (
                  <span className="hero__results-boxer">
                    <li key={boxer.id}>
                      <a href="/home">{boxer.name}</a>
                    </li>
                  </span>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
