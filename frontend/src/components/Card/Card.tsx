// src/components/Card/Card.tsx
import './Card.css';
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
  level: string;
  province: string;
  club: string;
  fightsWon: number;
  fightsLost: number;
}

interface CardProps {
  boxer: Boxer;
}

const Card = ({ boxer }: CardProps) => {
  return (
    <div className="card">
      <div className="card__image">
        <img
          src={boxer.profileImage || '../../images/profile.png'}
          alt={boxer.name || 'Boxer Profile'}
        />
      </div>
      <a href={`/boxers/${boxer.id}`}>
        <div className="card__container">
          <div className="card__top">
            <h2>{boxer.name}</h2>
            <p>
              <ReactCountryFlag
                countryCode={getIsoCode(boxer.country)}
                svg
                style={{ width: '1.3em', height: '1.3em' }}
              />
            </p>
          </div>
          <div className="card__middle">
            <h4>{boxer.weight}KG</h4>
            <h4>{boxer.sex} </h4>
            <h4>{boxer.age}</h4>
            <h4>{boxer.club} </h4>
          </div>

          <div className="card__bottom">
            <div className="card__bottom-bouts">
              <span className="won">
                <h3> {boxer.fightsWon}</h3>
              </span>
              <p>Won</p>
            </div>

            <div className="card__bottom-bouts">
              <span className="lost">
                <h3>{boxer.fightsLost}</h3>
              </span>
              <p>Lost</p>
            </div>
            <div className="card__bottom-bouts">
              <span className="draw">
                <h3>0</h3>
              </span>
              <p>Draw</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
