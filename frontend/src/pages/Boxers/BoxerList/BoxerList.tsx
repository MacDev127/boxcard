// src/pages/Boxers/BoxerList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../../components/Card/Card';
import './BoxerList.css';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/footer/Footer';

interface Boxer {
  id: number;
  name?: string;
  profileImage: string;
  age: number;
  sex: string;
  weight: number;
  country: string;
  club: string;
  fightsWon: number;
  fightsLost: number;
}

const BoxerList: React.FC = () => {
  const [boxerDetails, setBoxerDetails] = useState<Boxer[]>([]);

  useEffect(() => {
    const fetchBoxerDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/boxers');
        setBoxerDetails(response.data);
      } catch (error) {
        console.error('Error fetching boxer details:', error);
      }
    };

    fetchBoxerDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="boxer-list">
        {boxerDetails.map((boxer) => (
          <Card key={boxer.id} boxer={boxer} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default BoxerList;
