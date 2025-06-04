import { useState, useEffect } from 'react';
import './Hero.css';
import SearchIcon from '@mui/icons-material/Search';
import hero from '../../images/hero.png';
import axios from 'axios';
import ReactCountryFlag from 'react-country-flag';
import { getIsoCode } from './countryUtils';

interface Boxer {
  id: number;
  name: string;
  country: string;
  sex: string;
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
      setFilteredBoxers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchBoxer(inputValue);

    const filtered = boxerList.filter((boxer) =>
      boxer.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredBoxers(filtered);
  };

  return (
    <div className="hero">
      <div className="hero__banner">
        <img src={hero} alt="Hero" />
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
                  <li key={boxer.id} className="hero__results-boxer">
                    <a href={`/boxers/${boxer.id}`}>{boxer.name}</a>
                    <div className="hero__results-boxer-info">
                      <p className="hero__results-boxer-gender">{boxer.sex},</p>
                      <p className="hero__results-boxer-country">
                        {boxer.country}
                        <ReactCountryFlag
                          countryCode={getIsoCode(boxer.country)}
                          svg
                          style={{
                            width: '1.1em',
                            height: '1.1em',
                            marginLeft: '6px',
                          }}
                        />
                      </p>
                    </div>
                  </li>
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
