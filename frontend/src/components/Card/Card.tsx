import './Card.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactCountryFlag from 'react-country-flag';
import { getIsoCode } from './countryUtils';

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

const Card = () => {
  const [boxerDetails, setBoxerDetails] = useState<Boxer[]>([]);
  useEffect(() => {
    fetchBoxerDetails();
  }, []);

  const fetchBoxerDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/boxers');
      setBoxerDetails(response.data);
    } catch (error) {
      console.error('Error fetching boxer details:', error); // Handle the error gracefully. For example, display a message to the user.
    }
  };

  return (
    <div className="card">
      {boxerDetails.map((boxer) => (
        <div className="card__container">
          <img
            src={boxer.profileImage || '../../images/profile.png'}
            alt={boxer.name || 'Boxer Profile'}
          />
          <div>
            <h2>{boxer.name}</h2>
            <p>
              <ReactCountryFlag
                countryCode={getIsoCode(boxer.country)}
                svg
                style={{ width: '1.1em', height: '1.1em' }}
              />
            </p>
          </div>
          <div>
            <h4>{boxer.weight} kg</h4>
            <h4>{boxer.sex}</h4>
            <h3>{boxer.age}</h3>
            <p></p>
          </div>
          <div>
            <p>{boxer.fightsWon}</p>
            <p>{boxer.fightsLost}</p>
            <p>0</p>
          </div>

          <a href={`/boxers/${boxer.id}`}>View Profile</a>
        </div>
      ))}

      <p></p>
    </div>
  );
};

export default Card;
