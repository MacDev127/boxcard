// src/components/Card/Card.tsx
import React from 'react';
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

      <div className="card__container">
        <div className="card__top">
          <h2>{boxer.name}</h2>
          <p>
            <ReactCountryFlag
              countryCode={getIsoCode(boxer.country)}
              svg
              style={{ width: '1.5em', height: '1.5em' }}
            />
          </p>
        </div>
        <div className="card__middle">
          <h4>{boxer.weight} kg</h4>
          <h4>{boxer.sex}</h4>
          <h4>{boxer.age}</h4>
        </div>
        <div className="card__bottom">
          <p>{boxer.fightsWon}</p>
          <p>{boxer.fightsLost}</p>
          <p>0</p>
        </div>
        <div>
          <a href={`/boxers/${boxer.id}`}>View Profile</a>
        </div>
      </div>
    </div>
  );
};

export default Card;
