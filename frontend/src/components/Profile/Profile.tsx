import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import BoxerDetail from '../../pages/Boxers/BoxerDetail';

interface BoxerProfile {
  id: number;
  name?: string;
  profileImage: string;
  age: number;
  sex: string;
  weight: number;
  country: string;
  club: string;
  province: string;
  stance: string;
  level: string;
  fightsWon: number;
  fightsLost: number;
  videoUrl?: string | null;
}

const Profile = ({
  id,
  name,
  age,
  sex,
  weight,
  country,
  club,
  province,
  stance,
  level,
  fightsWon,
  fightsLost,
  profileImage,
  videoUrl,
}: BoxerProfile) => {
  useEffect(() => {
    fetchBoxers();
  }, []);
  const [boxerDetails, setBoxerDetails] = useState<BoxerProfile[]>([]);
  const fetchBoxers = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/boxers');
      setBoxerDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="Profile">
      <div className="profile__left">
        <img src={profileImage} alt="" />
      </div>
      <div className="profile__right">
        {boxerDetails.map((boxer) => {
          <div>{boxer.name}</div>;
        })}
        <h2>{name}</h2>
        <p>Age: {age}</p>
        <p>Sex: {sex}</p>
        <p>Weight: {weight} kg</p>
        <p>Country: {country}</p>
        <p>Club: {club}</p>
        <p>Province: {province}</p>
        <p>Stance: {stance}</p>
        <p>Level: {level}</p>
        <p>Fights Won: {fightsWon}</p>
        <p>Fights Lost: {fightsLost}</p>
        {videoUrl && <div className="profile__video-container">Video</div>}
      </div>
    </div>
  );
};

export default Profile;
