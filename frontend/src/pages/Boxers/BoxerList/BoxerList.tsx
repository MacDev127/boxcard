import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../../components/Card/Card';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/footer/Footer';
import AOS from 'aos';
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

  // Fetch filtered data whenever filters change
  useEffect(() => {
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

  return (
    <>
      <div className="boxer-list">
        <Navbar />
        <div className="boxer-list__filter">
          <select
            className="custom-dropdown"
            onChange={(e) => setSelectedWeight(e.target.value)}
          >
            <option value="" disabled selected>
              Weight
            </option>
            {weights.map((weight) => (
              <div
                className="container
                "
              >
                <option key={weight} value={weight}>
                  {weight}KG
                </option>
              </div>
            ))}
          </select>

          <select
            className="custom-dropdown"
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="">Level</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <select
            className="custom-dropdown"
            onChange={(e) => setSelectedSex(e.target.value)}
          >
            <option value="">Genders</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          <select
            className="custom-dropdown"
            onChange={(e) => setSelectedClub(e.target.value)}
          >
            <option value="">Club</option>
            {clubs.map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>

          <select
            className="custom-dropdown"
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Country</option>
            <option value="Ireland">Ireland</option>
            <option value="UK">UK</option>
            {/* Additional hardcoded or dynamic country options */}
          </select>
        </div>
        <div className="boxer-list__container">
          {boxerDetails.map((boxer) => (
            <Card key={boxer.id} boxer={boxer} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BoxerList;
