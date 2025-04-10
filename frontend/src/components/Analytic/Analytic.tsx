import React from 'react';
import './Analytic.css';

interface analyticProps {
  icon: React.ReactNode;
  name: string;
  data: string;
}

const Analytic = ({ name, data, icon }: analyticProps) => {
  return (
    <div className="analytic">
      <div className="analytic__card">
        <span>{icon}</span>
        <p>{name}</p>
        <h2>{data}</h2>
      </div>
    </div>
  );
};

export default Analytic;
