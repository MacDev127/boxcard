// BoxersTable.tsx
import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import './AdminTable.css';
import { useNavigate } from 'react-router-dom';
import { PiWarningDuotone } from 'react-icons/pi';
import Collapse from '@mui/material/Collapse';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface Boxer {
  id: number;
  name: string;
  country: string;
  age: number;
  weight: number;
  stance: string;
  level: string;
  profileImage: string;
}

type Order = 'asc' | 'desc';

const BoxersTable: React.FC = () => {
  const navigate = useNavigate();
  const [boxers, setBoxers] = useState<Boxer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sorting state
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Boxer>('name');

  useEffect(() => {
    axios.get('http://localhost:5002/api/boxers').then((res) => {
      setBoxers(res.data);
    });
  }, []);

  // Delete handler
  const handleDelete = async (id: number) => {
    try {
      console.log('http://localhost:5002/api/boxers/${id}');
      await axios.delete(`http://localhost:5002/api/boxers/${id}`);
      setBoxers((prev) => prev.filter((boxer) => boxer.id !== id));
    } catch (err) {
      console.error(err);
      setError('Error deleting boxer');
    }
  };

  // Sorting comparator: compares two items based on the orderBy field.
  const comparator = <T,>(a: T, b: T, orderBy: keyof T): number => {
    if (a[orderBy] < b[orderBy]) {
      return -1;
    }
    if (a[orderBy] > b[orderBy]) {
      return 1;
    }
    return 0;
  };

  // Sort the data using our comparator
  const sortedBoxers = [...boxers].sort((a, b) => {
    return order === 'asc'
      ? comparator(a, b, orderBy)
      : -comparator(a, b, orderBy);
  });

  // Slice data for pagination.
  const paginatedBoxers = sortedBoxers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle changing the sort order when a column header is clicked
  const handleRequestSort = (property: keyof Boxer) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Pagination handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>Profile</TableCell> */}
            <TableCell sortDirection={orderBy === 'name' ? order : false}>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleRequestSort('name')}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'country' ? order : false}>
              <TableSortLabel
                active={orderBy === 'country'}
                direction={orderBy === 'country' ? order : 'asc'}
                onClick={() => handleRequestSort('country')}
              >
                Country
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'age' ? order : false}>
              <TableSortLabel
                active={orderBy === 'age'}
                direction={orderBy === 'age' ? order : 'asc'}
                onClick={() => handleRequestSort('age')}
              >
                Age
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'weight' ? order : false}>
              <TableSortLabel
                active={orderBy === 'weight'}
                direction={orderBy === 'weight' ? order : 'asc'}
                onClick={() => handleRequestSort('weight')}
              >
                Weight (KG)
              </TableSortLabel>
            </TableCell>
            <TableCell>Stance</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedBoxers.map((boxer) => (
            <>
              <TableRow key={boxer.id}>
                {/* <TableCell className="table__image">
      <img
        src={
          boxer.profileImage
            ? `http://localhost:5002/uploads/${boxer.profileImage}`
            : '../../images/profile.png'
        }
        alt={boxer.name || 'Boxer Profile'}
        onError={(e) => console.error('Image load error:', e)}
      />
    </TableCell> */}
                <TableCell>{boxer.name}</TableCell>
                <TableCell>{boxer.country}</TableCell>
                <TableCell>{boxer.age}</TableCell>
                <TableCell>{boxer.weight}</TableCell>
                <TableCell>{boxer.stance}</TableCell>
                <TableCell>{boxer.level}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() =>
                      navigate(`/dashboard/boxers/${boxer.id}/edit`)
                    }
                  >
                    <Edit style={{ color: '#22c55e' }} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    /* // onClick={() => handleDelete(boxer.id)} */
                    onClick={() =>
                      setOpenModalId(openModalId === boxer.id ? null : boxer.id)
                    }
                  >
                    <Delete style={{ color: '#ef4444' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
              <Collapse in={openModalId === boxer.id} timeout="auto">
                <div className="modal">
                  <p>Are you sure you want to delete this boxer?</p>
                  <div className="modal-wrapper">
                    <CheckIcon
                      style={{ color: '#22c55e' }}
                      onClick={() => {
                        handleDelete(boxer.id);
                        setOpenModalId(null); // close modal after delete
                      }}
                      aria-label="delete"
                    />
                    <CloseIcon
                      style={{ color: '#ef4444' }}
                      onClick={
                        () => setOpenModalId(null) // close modal after delete
                      }
                    />
                  </div>
                </div>
              </Collapse>
            </>
          ))}
        </TableBody>
      </Table>

      {error && (
        <div className="error-wrapper">
          <p className="error-message">
            {error} <PiWarningDuotone fontSize="28px" />
          </p>
        </div>
      )}
      <TablePagination
        component="div"
        count={boxers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
};

export default BoxersTable;
