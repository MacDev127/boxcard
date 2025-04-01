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
          <td data-label="Opponent">Paddy Smith</td>
          <td data-label="Result">
            <span className="table__win">W - UD</span>
          </td>
          <td data-label="Competition">National Youths</td>
          <td data-label="Date">04/01/2016</td>
        </tr>
        <tr>
          <td data-label="Opponent">James Ryan</td>
          <td data-label="Result">
            <span className="table__win">W - SD</span>
          </td>
          <td data-label="Competition">National Youths</td>
          <td data-label="Date">05/01/2016</td>
        </tr>
        <tr>
          <td data-label="Opponent">Lional Messi</td>
          <td data-label="Result">
            <span className="table__win">W - UD</span>
          </td>
          <td data-label="Competition">Eurpean Youths</td>
          <td data-label="Date">12/02/2016</td>
        </tr>
        <tr>
          <td data-label="Opponent">Carl Frampton</td>
          <td data-label="Result">
            <span className="table__loss">L - SD</span>
          </td>
          <td data-label="Competition">Celtic Box Cup</td>
          <td data-label="Date">04/03/2016</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
