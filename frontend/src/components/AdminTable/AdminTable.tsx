// BoxersTable.tsx
import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import './AdminTable.css';
import Profile from '../Profile/Profile';

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

const BoxersTable: React.FC = () => {
  const [boxers, setBoxers] = useState<Boxer[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5002/api/boxers').then((res) => {
      setBoxers(res.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:5002/api/boxers/${id}`).then(() => {
      setBoxers(boxers.filter((boxer) => boxer.id !== id));
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Weight (KG)</TableCell>
            <TableCell>Stance</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boxers.map((boxer) => (
            <TableRow key={boxer.id}>
              <TableCell className="table__image">
                <img
                  src={
                    boxer.profileImage
                      ? `http://localhost:5002/uploads/${boxer.profileImage}`
                      : '../../images/profile.png'
                  }
                  alt={boxer.name || 'Boxer Profile'}
                  onError={(e) => console.error('Image load error:', e)}
                />
              </TableCell>
              <TableCell>{boxer.name}</TableCell>
              <TableCell>{boxer.country}</TableCell>
              <TableCell>{boxer.age}</TableCell>
              <TableCell>{boxer.weight}</TableCell>
              <TableCell>{boxer.stance}</TableCell>
              <TableCell>{boxer.level}</TableCell>
              <TableCell>
                <IconButton aria-label="edit">
                  <Edit style={{ color: '#22c55e' }} />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(boxer.id)}
                >
                  <Delete style={{ color: '#ef4444' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BoxersTable;
