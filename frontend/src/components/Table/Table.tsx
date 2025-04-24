// src/components/Table/Table.tsx
import React from 'react';
import './Table.css';

export interface ContestResults {
  id: number;
  date: string;
  result: string;
  competition: string;
  boxer1Id: number;
  boxer2Id: number;
  winnerId: number;
  boxer1: { id: number; name: string };
  boxer2: { id: number; name: string };
}

interface TableProps {
  bouts: ContestResults[];
  boxerId: number;
}

const Table: React.FC<TableProps> = ({ bouts, boxerId }) => {
  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Opponent</th>
          <th>Result</th>
          <th>Competition</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {bouts.map((bout) => {
          const opponent =
            bout.boxer1Id === boxerId ? bout.boxer2.name : bout.boxer1.name;

          return (
            <tr key={bout.id}>
              <td data-label="Opponent">{opponent}</td>

              <td data-label="Result">
                <span
                  className={
                    bout.result.startsWith('W') ? 'table__win' : 'table__loss'
                  }
                >
                  {bout.result}
                </span>
              </td>
              <td data-label="Competition">{bout.competition}</td>
              <td data-label="Date">
                {new Date(bout.date).toLocaleDateString()}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
