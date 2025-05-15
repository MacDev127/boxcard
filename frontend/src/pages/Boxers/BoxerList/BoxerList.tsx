import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../../components/Card/Card';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import AOS from 'aos';
import { RiResetLeftFill } from 'react-icons/ri';
import { FaFilter } from 'react-icons/fa';
import Collapse from '@mui/material/Collapse';
import Pagination from '@mui/material/Pagination';

import 'aos/dist/aos.css';
import './BoxerList.css';

interface Boxer {
  id: number;
  name: string;
  profileImage: string;
  age: number;
  sex: string;
  level: string;
  province: string;
  weight: number;
  country: string;
  club: string;
  fightsWon: number;
  fightsLost: number;
}

const BoxerList = () => {
  const [boxerDetails, setBoxerDetails] = useState<Boxer[]>([]);
  const [weights, setWeights] = useState<number[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [clubs, setClubs] = useState<string[]>([]);
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedClub, setSelectedClub] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage] = useState<number>(12);

  // Fetch initial boxer data and filter options
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
    });
    const fetchInitialData = async () => {
      try {
        const [boxersRes, weightsRes, levelsRes, clubsRes] = await Promise.all([
          axios.get('http://localhost:5002/api/boxers'),
          axios.get('http://localhost:5002/api/boxers/filters/weights'),
          axios.get('http://localhost:5002/api/boxers/filters/levels'),
          axios.get('http://localhost:5002/api/boxers/filters/clubs'),
        ]);

        setBoxerDetails(boxersRes.data);
        setWeights(weightsRes.data);
        setLevels(levelsRes.data);
        setClubs(clubsRes.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);

    const fetchFilteredBoxers = async () => {
      try {
        const params = new URLSearchParams();
        if (selectedSex) params.append('sex', selectedSex);
        if (selectedClub) params.append('club', selectedClub);
        if (selectedCountry) params.append('country', selectedCountry);
        if (selectedWeight) params.append('weight', selectedWeight);
        if (selectedLevel) params.append('level', selectedLevel);

        const response = await axios.get(
          `http://localhost:5002/api/boxers?${params.toString()}`
        );
        setBoxerDetails(response.data);
      } catch (error) {
        console.error('Error fetching filtered boxer details:', error);
      }
    };

    fetchFilteredBoxers();
  }, [
    selectedSex,
    selectedClub,
    selectedCountry,
    selectedWeight,
    selectedLevel,
  ]);

  const handleResetFilters = () => {
    setSelectedSex('');
    setSelectedClub('');
    setSelectedCountry('');
    setSelectedWeight('');
    setSelectedLevel('');
  };

  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;

  // Slice out only the cards for this page
  const currentCards = boxerDetails.slice(firstIndex, lastIndex);

  // How many pages?
  const pageCount = Math.ceil(boxerDetails.length / cardsPerPage);

  return (
    <>
      <div className="boxer-list">
        <Navbar />
        <div className="filter-list__wrapper">
          <div className="boxer-list__show">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="boxer-list__filter-btn"
            >
              Filters
              <FaFilter />
            </button>
          </div>

          <Collapse in={showFilter} timeout="auto">
            <div className="boxer-list__filter">
              {/* //weight */}
              <select
                className="custom-dropdown"
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value)}
              >
                <option value="" disabled>
                  Weight
                </option>
                {weights.map((weight) => (
                  <option key={weight} value={weight}>
                    {weight}KG
                  </option>
                ))}
              </select>

              {/* Level */}
              <select
                className="custom-dropdown"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">Level</option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              {/* Gender */}
              <select
                className="custom-dropdown"
                value={selectedSex}
                onChange={(e) => setSelectedSex(e.target.value)}
              >
                <option value="" disabled>
                  Gender
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>

              {/* Club */}
              <select
                className="custom-dropdown"
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
              >
                <option value="" disabled>
                  Club
                </option>
                {clubs.map((club) => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                ))}
              </select>

              {/* Country */}
              <select
                className="custom-dropdown"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="" disabled>
                  Country
                </option>
                <option value="Ireland">Ireland</option>
                <option value="UK">UK</option>
              </select>

              <button onClick={handleResetFilters} className="filter-reset">
                Reset
                <RiResetLeftFill className="reset-icon" fontSize="14px" />
              </button>
            </div>
          </Collapse>
        </div>

        <div className="boxer-list__container">
          {currentCards.map((boxer) => (
            <Card key={boxer.id} boxer={boxer} />
          ))}
        </div>
      </div>
      {pageCount > 1 && (
        <div className="pagination-wrapper">
          <Pagination
            variant="outlined"
            shape="rounded"
            count={pageCount}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default BoxerList;
