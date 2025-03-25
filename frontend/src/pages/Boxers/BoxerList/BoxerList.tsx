// src/pages/Boxers/BoxerList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../../components/Card/Card';
import './BoxerList.css';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/footer/Footer';

interface Boxer {
  id: number;
  name: string;
  profileImage: string;
  age: number;
  sex: string;
  province: string;
  weight: number;
  country: string;
  club: string;
  fightsWon: number;
  fightsLost: number;
}

const BoxerList = ({ boxer }: FilterProps) => {
  const [boxerDetails, setBoxerDetails] = useState<Boxer[]>([]);
  const [selectedSex, setSelectedSex] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  useEffect(() => {
    const fetchBoxerDetails = async () => {
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
        console.error('Error fetching boxer details:', error);
      }
    };

    fetchBoxerDetails();
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
          <select onChange={(e) => setSelectedWeight(e.target.value)}>
            <option value="">Weights</option>
            <option value="48">48KG</option>
            <option value="51">51KG</option>
            <option value="52">52KG</option>
            <option value="54">54KG</option>
            <option value="57">57KG</option>
            <option value="60">60KG</option>
            <option value="63">63KG</option>
            <option value="66">66KG</option>
            <option value="70">70KG</option>
            <option value="75">75KG</option>
            <option value="80">80KG</option>
            <option value="85">85KG</option>
            <option value="91">91+KG</option>
          </select>
          <select onChange={(e) => setSelectedLevel(e.target.value)}>
            <option value="">All Level</option>
            <option value="schools">School Boy / School Girl</option>
            <option value="junior">Junior</option>
            <option value="youth">Youth</option>
            <option value="senior">Senior</option>
            <option value="Elite">Elite</option>
          </select>
          <select onChange={(e) => setSelectedSex(e.target.value)}>
            <option value="">All Genders</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          <select onChange={(e) => setSelectedClub(e.target.value)}>
            <option value="">All Clubs</option>
            <option value="ClubA">Club A</option>
            <option value="ClubB">Club B</option>
            {/* Add more club options as needed */}
          </select>

          <select onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="">All Countries</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            {/* Add more country options as needed */}
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
