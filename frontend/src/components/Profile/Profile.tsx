import { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag';
import ReactPlayer from 'react-player';
import { getIsoCode } from './countryUtils';
import CustomAccordion from '../Accoridan/CustomAccoridan';
import Table from '../Table/Table';
import type { BoxerProfile, ContestResults, BoutOutcome } from './profileTypes';
import FighterRadar from '../FighterRader/FighterRader';
import Title from '../Title/Title';

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

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [boxer, setBoxer] = useState<BoxerProfile | null>(null);
  const [contestData, setContestData] = useState<ContestResults[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        // fetch boxer
        const { data: boxer } = await axios.get<BoxerProfile>(
          `http://localhost:5002/api/boxers/${id}`
        );
        setBoxer(boxer);

        // fetch their last-5 contests
        const { data: contests } = await axios.get<ContestResults[]>(
          `http://localhost:5002/api/boxers/${id}/contests?limit=5`
        );
        setContestData(contests);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile or contests');
      }
    })();
  }, [id]);

  if (!boxer) return <div>Loading…</div>;

  const recentOutcomes: BoutOutcome[] = contestData.map((contest) =>
    contest.winnerId === boxer.id ? 'win' : 'loss'
  );

  return (
    <div className="Profile">
      <div className="profile__top">
        <div className="profile__top-image">
          <img
            src={
              boxer.profileImage
                ? `http://localhost:5002/uploads/${boxer.profileImage}`
                : '../../images/profile.png'
            }
            alt={boxer.name || 'Boxer Profile'}
            onError={(e) => console.error('Image load error:', e)}
          />
        </div>
        <div className="profile__top-name">
          <h2>{boxer.name}</h2>
          <div className="profile__top-bio">
            <h4>Bio</h4>

            <p>{boxer.bio ? boxer.bio : 'No Bio Available'}</p>
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
          <Title>Bouts</Title>
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
          <Title>Last 5 Bouts</Title>
          <div className="profile__bouts-recent-list">
            {recentOutcomes.map((outcome, index) => (
              <span
                key={index}
                className={`profile__bouts-recent-result ${outcome}`}
              ></span>
            ))}
          </div>
        </div>
        <div className="profile__bouts-percentage">
          <Title>WIN PERCENTAGE</Title>
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
        <Title className="profile__results-title">Results</Title>
        <div className="profile__results-table">
          <Table bouts={contestData} boxerId={boxer.id} />{' '}
        </div>
        {error && <p>Error fetching contest data</p>}
      </div>

      {/* Results stats */}
      <div className="profile__stats">
        <Title className="profile__stats-title">Stats</Title>
        <div className="profile__stats-charts">
          <FighterRadar />
        </div>
        {error && <p>Error fetching contest data</p>}
      </div>
      {/*---------------- Video Section ----------*/}
      <div className="profile__video">
        {boxer.videoUrl ? (
          <CustomAccordion title="View Highlights">
            <ReactPlayer
              url={boxer.videoUrl}
              controls
              width="100%"
              height="500px"
            />
          </CustomAccordion>
        ) : (
          <h3>No video available.</h3>
        )}
      </div>
    </div>
  );
};

export default Profile;
