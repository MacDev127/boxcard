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

interface Boxer {
  id: number;
  name: string;
  country: string;
  age: number;
  weight: number;
  stance: string;
  level: string;
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
              <TableCell>{boxer.name}</TableCell>
              <TableCell>{boxer.country}</TableCell>
              <TableCell>{boxer.age}</TableCell>
              <TableCell>{boxer.weight}</TableCell>
              <TableCell>{boxer.stance}</TableCell>
              <TableCell>{boxer.level}</TableCell>
              <TableCell>
                <IconButton aria-label="edit">
                  <Edit />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(boxer.id)}
                >
                  <Delete />
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
