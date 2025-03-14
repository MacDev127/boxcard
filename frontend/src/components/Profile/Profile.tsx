import { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

const Profile = () => {
  // Get the boxer ID from the route, e.g., /boxers/5
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
      <div className="profile__details">
        <div className="profile__top">
          <div className="profile__top-image">
            <img
              src={boxer.profileImage || 'https://placehold.co/200x200'}
              alt={boxer.name || 'Boxer Profile'}
            />
          </div>
          <div className="profile__top-info">
            <h2>{boxer.name}</h2>
            <h3>Weight: {boxer.weight}kgs</h3>
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
    </div>
  );
};

export default Profile;
