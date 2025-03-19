import { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import { getIsoCode } from './countryUtils'; // <-- your utility function path

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

const totalBouts = (boxer: BoxerProfile) => {
  return boxer.fightsWon + boxer.fightsLost;
};
const totalRounds = (boxer: BoxerProfile) => {
  return totalBouts(boxer) * 3;
};

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [boxer, setBoxer] = useState<BoxerProfile | null>(null);

  useEffect(() => {
    const fetchBoxer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/boxers/${id}`
        );
        setBoxer(response.data);
      } catch (error) {
        console.error('Error fetching boxer details:', error);
      }
    };

    if (id) {
      fetchBoxer();
    }
  }, [id]);

  if (!boxer) {
    return <div>Loading boxer details...</div>;
  }

  return (
    <div className="Profile">
      <div className="profile__top">
        <div className="profile__top-image">
          <img
            src={boxer.profileImage || '../../images/profile.png'}
            alt={boxer.name || 'Boxer Profile'}
          />
        </div>
        <div className="profile__top-name">
          <h2>{boxer.name}</h2>
          <div className="profile__top-wrapper">
            <div className="profile__column">
              <ul className="profile__stat-list">
                <li className="profile__stat-item">
                  <h4>Nationality</h4>
                  <p>
                    <ReactCountryFlag
                      countryCode={getIsoCode(boxer.country)}
                      svg
                      style={{ width: '1.1em', height: '1.1em' }}
                    />
                  </p>
                </li>
                <li className="profile__stat-item">
                  <h4>Weight</h4>
                  <p>{boxer.weight} kgs</p>
                </li>
                <li className="profile__stat-item">
                  <h4>Bouts</h4>
                  <p>{totalBouts(boxer)}</p>
                </li>
                <li className="profile__stat-item">
                  <h4>Rounds</h4>
                  <p>{totalRounds(boxer)}</p>
                </li>
              </ul>
            </div>

            <div className="profile__column">
              <ul className="profile__stat-list">
                <li className="profile__stat-item">
                  <h4>Gender</h4>
                  <p>{boxer.sex}</p>
                </li>
                <li className="profile__stat-item">
                  <h4>Age</h4>
                  <p>{boxer.age}</p>
                </li>
                <li className="profile__stat-item">
                  <h4>Level</h4>
                  <p>{boxer.level}</p>
                </li>
                <li className="profile__stat-item">
                  <h4>Stance</h4>
                  <p>{boxer.stance}</p>
                </li>
              </ul>
            </div>

            <div className="profile__column">
              <ul className="profile__stat-list">
                <li className="profile__stat-item">
                  <h4>Club</h4>
                  <p>{boxer.club}</p>
                </li>
                <li className="profile__stat-item">
                  <h4>Province</h4>
                  <p>{boxer.province}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="profile__top-fights">
        <h2>BOUTS</h2>
        <div className="profile__top-fights-stats">
          <div className="profile__top-fights-stats-won">
            <span className="won">
              <h3> {boxer.fightsWon}</h3>
            </span>
            <p>Won</p>
          </div>
          <div className="profile__top-fight-stats-lost">
            <span className="lost">
              <h3>{boxer.fightsLost}</h3>
            </span>
            <p>Lost</p>
          </div>
          <div className="profile__top-fight-stats-draw">
            <span className="draw">
              <h3>0</h3>
            </span>
            <p>Draw</p>
          </div>
        </div>
      </div>
      {boxer.videoUrl && (
        <p>
          <strong>Video:</strong>{' '}
          <a href={boxer.videoUrl} target="_blank" rel="noopener noreferrer">
            Watch
          </a>
        </p>
      )}
      <div className="profile__bottom">
        <div className="profile__bottom-stat">
          <h3>Age</h3>
          <p>{boxer.age}</p>
        </div>
        <div className="profile__bottom-stat">
          <h3>Gender</h3>
          <p>{boxer.sex}</p>
        </div>
        <div className="profile__bottom-stat">
          <h3>Country</h3>
          <p>{boxer.country}</p>
        </div>
        <div className="profile__bottom-stat">
          <h3>Province</h3>
          <p>{boxer.province}</p>
        </div>
        <div className="profile__bottom-stat">
          <h3>Club</h3>
          <p>{boxer.club}</p>
        </div>
        <div className="profile__bottom-stat">
          <h3>Stance</h3>
          <p>{boxer.stance}</p>
        </div>
        <div className="profile__bottom-stat">
          <h3>Level</h3>
          <p>{boxer.level}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
