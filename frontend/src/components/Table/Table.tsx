import React from 'react';
import './Table.css';

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Opponent</th>
          <th scope="col">Result</th>
          <th scope="col">Competition</th>
          <th scope="col">Due Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Opponent">Visa - 3412</td>
          <td data-label="Result">$1,190</td>
          <td data-label="Competition">03/01/2016 - 03/31/2016</td>
          <td data-label="Due Date">04/01/2016</td>
        </tr>
        <tr>
          <td scope="row" data-label="Opponent">
            Visa - 6076
          </td>
          <td data-label="Result">$2,443</td>
          <td data-label="Competition">02/01/2016 - 02/29/2016</td>
          <td data-label="Due Date">03/01/2016</td>
        </tr>
        <tr>
          <td scope="row" data-label="Opponent">
            Corporate AMEX
          </td>
          <td data-label="Result">$1,181</td>
          <td data-label="Competition">02/01/2016 - 02/29/2016</td>
          <td data-label="Due Date">03/01/2016</td>
        </tr>
        <tr>
          <td scope="row" data-label="Acount" className="td-bottom">
            Visa - 3412
          </td>

          <td data-label="Result" className="td-bottom">
            $842
          </td>
          <td data-label="Competition" className="td-bottom">
            01/01/2016 - 01/31/2016
          </td>
          <td data-label="Due Date" className="td-bottom">
            02/01/2016
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
