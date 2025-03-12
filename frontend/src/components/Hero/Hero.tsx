import { useState } from 'react';
import './Hero.css';
import SearchIcon from '@mui/icons-material/Search';
import banner from '../../images/banner.png';
import Axios from 'Axios';

const Hero = () => {
  const [searchBoxer, setSearchBoxer] = useState<string>('');
  const [boxerList, setBoxerList] = useState<string[]>(['']);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBoxer(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const filteredBoxers = boxerList.filter((boxer) =>
      boxer.toLowerCase().includes(searchBoxer.toLowerCase())
    );
    setBoxerList(filteredBoxers);
    setSearchBoxer('');
  };

  const fetchBoxers = async () => {
    try {
      const response = await Axios.get(
        'https://www.thesportsdb.com/api/v1/json/1/searchboxer.php?q='
      );
      setBoxerList(response.data.boxers.map((boxer) => boxer.strBoxer));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hero">
      <div className="hero__banner">
        <img src={banner} alt="" />
        <div className="hero__input-container">
          <input
            type="text"
            placeholder="Find a Boxer"
            onChange={handleSearchChange}
          />
          <button type="submit" onClick={handleSubmit}>
            <SearchIcon />
          </button>
        </div>
        <div>
          <ul>
            {boxerList.map((boxList) => {
              return <li key={boxList}>{boxList}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hero;
