import { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import ReactPlayer from 'react-player';
import { getIsoCode } from './countryUtils';
import CustomAccordion from '../Accoridan/CustomAccoridan';
import Table from '../Table/Table';

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

type BoutOutcome = 'win' | 'loss';

//Total Bouts function
const totalBouts = (boxer: BoxerProfile) => {
  return boxer.fightsWon + boxer.fightsLost;
};

//Win percentage function
const winPercentage = (boxer: BoxerProfile) => {
  if (totalBouts(boxer) === 0) {
    return 0;
  }
  return (boxer.fightsWon / totalBouts(boxer)) * 100;
};

//Random result function
const getRandomBout = (): BoutOutcome => {
  const outcomes: BoutOutcome[] = ['win', 'loss'];
  return outcomes[Math.floor(Math.random() * outcomes.length)];
};

const generateRandomOutcomes = (count: number = 5): BoutOutcome[] => {
  return Array.from({ length: count }, () => getRandomBout());
};

const results = generateRandomOutcomes(5);
//Random result function

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
        <div className="profile__top-image" style={{ border: '2px solid red' }}>
          <img
            src={
              boxer.profileImage
                ? `http://localhost:5002/uploads/${boxer.profileImage}`
                : '../../images/profile.png'
            }
            alt={boxer.name || 'Boxer Profile'}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            onError={(e) => console.error('Image load error:', e)}
          />
        </div>
        <div className="profile__top-name">
          <h2>{boxer.name}</h2>
          <div className="profile__top-bio">
            <h4>Bio</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              inventore eveniet impedit natus adipisci quae dolore eligendi
              quam, vero quidem qui asperiores sunt, rerum nesciunt culpa
              exercitationem at, minima voluptatum. Tempore repellat eveniet
              omnis voluptatibus, consequatur, perferendis molestias cum error
              repudiandae quaerat laboriosam deleniti, nulla harum laborum quos
              praesentium nostrum.
            </p>
          </div>
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
                  <h4>Age</h4>
                  <p>{boxer.age}</p>
                </li>
                <li className="profile__stat-item">
                  <h4>Weight</h4>
                  <p>{boxer.weight} kgs</p>
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
                  <h4>Bouts</h4>
                  <p>{totalBouts(boxer)}</p>
                </li>

                <li className="profile__stat-item">
                  <h4>Level</h4>
                  <p>{boxer.level}</p>
                </li>
              </ul>
            </div>

            <div className="profile__column">
              <ul className="profile__stat-list">
                <li className="profile__stat-item">
                  <h4>Stance</h4>
                  <p>{boxer.stance}</p>
                </li>
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

      {/* --------------bouts section---------------------- */}
      <div className="profile__bouts">
        <div className="profile__bouts-title">
          <h2>BOUTS</h2>
        </div>

        <div className="profile__bouts-stats">
          <div className="profile__bouts-stats-detail">
            <span className="won">
              <h3> {boxer.fightsWon}</h3>
            </span>
            <p>Won</p>
          </div>
          <div className="profile__bouts-stats-detail">
            <span className="lost">
              <h3>{boxer.fightsLost}</h3>
            </span>
            <p>Lost</p>
          </div>
          <div className="profile__bouts-stats-detail">
            <span className="draw">
              <h3>0</h3>
            </span>
            <p>Draw</p>
          </div>
        </div>
        <div className="profile__bouts-recent">
          <h2>Last 5 Bouts</h2>
          <div className="profile__bouts-recent-list">
            {results.map((result, index) => (
              <span
                key={index}
                className={`profile__bouts-recent-result ${result}`}
              ></span>
            ))}
          </div>
        </div>
        <div className="profile__bouts-percentage">
          <h2>Win Percentage</h2>
          {winPercentage(boxer) >= 50 ? (
            <h3 className="percentage-high">
              {winPercentage(boxer).toFixed(2)}%
            </h3>
          ) : (
            <h3 className="percentage-low">
              {winPercentage(boxer).toFixed(2)}%
            </h3>
          )}
        </div>
      </div>

      {/*---------------- Results Table ----------*/}
      <div className="profile__results">
        <h2>Results</h2>
        <div className="profile__results-table">
          <Table />
        </div>
      </div>
      {/*---------------- Video Section ----------*/}
      <div className="profile__video">
        {boxer.videoUrl ? (
          <CustomAccordion title="View Highlights">
            <ReactPlayer url={boxer.videoUrl} controls width="100%" />
          </CustomAccordion>
        ) : (
          <h3>No video available.</h3>
        )}
      </div>
    </div>
  );
};

export default Profile;
