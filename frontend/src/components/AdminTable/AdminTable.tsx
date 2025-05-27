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
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PiWarningDuotone } from 'react-icons/pi';
import Collapse from '@mui/material/Collapse';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import './AdminTable.css';

interface Boxer {
  id: number;
  name: string;
  country: string;
  age: number;
  weight: number;
  stance: string;
  level: string;
  profileImage: string; // URL or filename
}

type Order = 'asc' | 'desc';

const BoxersTable: React.FC = () => {
  const navigate = useNavigate();
  const [boxers, setBoxers] = useState<Boxer[]>([]);
  const [error, setError] = useState<string | null>(null);

  // sorting & pagination
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Boxer>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // delete confirmation collapse
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  // ** NEW: dialog state **
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBoxer, setSelectedBoxer] = useState<Boxer | null>(null);

  useEffect(() => {
    axios
      .get<Boxer[]>('http://localhost:5002/api/boxers')
      .then((res) => setBoxers(res.data))
      .catch(() => setError('Error loading boxers'));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5002/api/boxers/${id}`);
      setBoxers((bs) => bs.filter((b) => b.id !== id));
      setOpenModalId(null);
    } catch {
      setError('Error deleting boxer');
    }
  };

  //  pagination logic

  const comparator = <T,>(a: T, b: T, orderBy: keyof T) =>
    a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;

  const sorted = [...boxers].sort((a, b) =>
    order === 'asc' ? comparator(a, b, orderBy) : -comparator(a, b, orderBy)
  );

  const displayed = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell sortDirection={orderBy === 'name' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => {
                    const isAsc = orderBy === 'name' && order === 'asc';
                    setOrder(isAsc ? 'desc' : 'asc');
                    setOrderBy('name');
                  }}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'country' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'country'}
                  direction={orderBy === 'country' ? order : 'asc'}
                  onClick={() => {
                    const isAsc = orderBy === 'country' && order === 'asc';
                    setOrder(isAsc ? 'desc' : 'asc');
                    setOrderBy('country');
                  }}
                >
                  Country
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'age' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'age'}
                  direction={orderBy === 'age' ? order : 'asc'}
                  onClick={() => {
                    const isAsc = orderBy === 'age' && order === 'asc';
                    setOrder(isAsc ? 'desc' : 'asc');
                    setOrderBy('age');
                  }}
                >
                  Age
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'weight' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'weight'}
                  direction={orderBy === 'weight' ? order : 'asc'}
                  onClick={() => {
                    const isAsc = orderBy === 'weight' && order === 'asc';
                    setOrder(isAsc ? 'desc' : 'asc');
                    setOrderBy('weight');
                  }}
                >
                  Weight
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'stance' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'stance'}
                  direction={orderBy === 'stance' ? order : 'asc'}
                  onClick={() => {
                    const isAsc = orderBy === 'stance' && order === 'asc';
                    setOrder(isAsc ? 'desc' : 'asc');
                    setOrderBy('stance');
                  }}
                >
                  Stance
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === 'level' ? order : false}>
                <TableSortLabel
                  active={orderBy === 'level'}
                  direction={orderBy === 'level' ? order : 'asc'}
                  onClick={() => {
                    const isAsc = orderBy === 'level' && order === 'asc';
                    setOrder(isAsc ? 'desc' : 'asc');
                    setOrderBy('level');
                  }}
                >
                  Level
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
              {/* Country, Age, Weight, Stance, Level, Actions */}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayed.map((boxer) => (
              <React.Fragment key={boxer.id}>
                <TableRow
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    setSelectedBoxer(boxer);
                    setDialogOpen(true);
                  }}
                >
                  {/* PROFILE IMAGE */}
                  <TableCell>
                    <Avatar
                      src={`http://localhost:5002/uploads/${boxer.profileImage}`}
                      alt={boxer.name}
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>{boxer.name}</TableCell>
                  <TableCell>{boxer.country}</TableCell>
                  <TableCell>{boxer.age}</TableCell>
                  <TableCell>{boxer.weight}</TableCell>
                  <TableCell>{boxer.stance}</TableCell>
                  <TableCell>{boxer.level}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/boxers/${boxer.id}/edit`);
                      }}
                    >
                      <Edit sx={{ color: '#22c55e' }} />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenModalId(
                          openModalId === boxer.id ? null : boxer.id
                        );
                      }}
                    >
                      <Delete sx={{ color: '#ef4444' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>

                {/* delete-confirmation */}
                <TableRow>
                  <TableCell colSpan={8} style={{ padding: 0 }}>
                    <Collapse
                      in={openModalId === boxer.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box
                        px={2}
                        py={1}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography>Delete {boxer.name}?</Typography>
                        <Box>
                          <IconButton onClick={() => handleDelete(boxer.id)}>
                            <CheckIcon color="success" />
                          </IconButton>
                          <IconButton onClick={() => setOpenModalId(null)}>
                            <CloseIcon color="error" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        {error && (
          <Box p={2} display="flex" alignItems="center">
            <PiWarningDuotone fontSize={24} color="error" />
            <Typography color="error" ml={1}>
              {error}
            </Typography>
          </Box>
        )}

        <TablePagination
          component="div"
          count={boxers.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>

      {/* ========= DIALOG ========= */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Boxer Details</DialogTitle>
        <DialogContent dividers>
          {selectedBoxer && (
            <Box textAlign="center">
              <Avatar
                src={`http://localhost:5002/uploads/${selectedBoxer.profileImage}`}
                alt={selectedBoxer.name}
                sx={{ width: 90, height: 90, mx: 'auto', mb: 2 }}
              />
              <h2 className="info-box__name">{selectedBoxer.name}</h2>

              <div className="info-box__details">
                <span>Country:</span>
                <p>{selectedBoxer.country}</p>
              </div>
              <div className="info-box__details">
                <span>Age:</span>
                <p>{selectedBoxer.age}</p>
              </div>
              <div className="info-box__details">
                <span>Weight (kg):</span>
                <p>{selectedBoxer.weight}</p>
              </div>
              <div className="info-box__details">
                <span>Stance:</span>
                <p>{selectedBoxer.stance}</p>
              </div>
              <div className="info-box__details">
                <span>Level:</span>
                <p>{selectedBoxer.level}</p>
              </div>
            </Box>
          )}
          <Box textAlign="right" mt={2}>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BoxersTable;
