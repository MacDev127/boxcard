// src/components/BoxersTable.tsx
import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
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
  Button,
  Collapse,
} from '@mui/material';
import { Edit, Delete, Check, Close } from '@mui/icons-material';
import { PiWarningDuotone } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import './AdminTable.css';

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
  const [searchText, setSearchText] = useState('');

  // Sorting & pagination
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Boxer>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Delete confirmation
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  // Detail dialog
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

  // comparator
  const comparator = <T,>(a: T, b: T, key: keyof T) =>
    a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;

  // 1) filter by search
  const filtered = boxers.filter((b) =>
    b.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // 2) sort the filtered
  const sorted = [...filtered].sort((a, b) =>
    order === 'asc' ? comparator(a, b, orderBy) : -comparator(a, b, orderBy)
  );

  // 3) paginate the sorted
  const displayed = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <TableContainer component={Paper}>
        {/* Search bar */}
        <div className="search-container">
          <TextField
            className="boxer-search"
            size="small"
            variant="outlined"
            placeholder="Search boxers…"
            value={searchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchText(e.target.value);
              setPage(0);
            }}
            sx={{
              width: 250,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--secondarybg)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'var(--button)',
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                {
                  borderColor: 'var(--button)',
                },
            }}
            InputLabelProps={{
              shrink: false,
            }}
          />
        </div>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              {(
                [
                  'name',
                  'country',
                  'age',
                  'weight',
                  'stance',
                  'level',
                ] as (keyof Boxer)[]
              ).map((col) => (
                <TableCell
                  key={col}
                  sortDirection={orderBy === col ? order : false}
                  sx={{
                    display:
                      col === 'country' ||
                      col === 'age' ||
                      col === 'weight' ||
                      col === 'stance' ||
                      col === 'level'
                        ? { xs: 'none', md: 'table-cell' }
                        : undefined,
                  }}
                >
                  <TableSortLabel
                    active={orderBy === col}
                    direction={orderBy === col ? order : 'asc'}
                    onClick={() => {
                      const isAsc = orderBy === col && order === 'asc';
                      setOrder(isAsc ? 'desc' : 'asc');
                      setOrderBy(col);
                    }}
                  >
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
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
                  <TableCell>
                    <Avatar
                      src={`http://localhost:5002/uploads/${boxer.profileImage}`}
                      alt={boxer.name}
                      sx={{ width: 50, height: 50 }}
                    />
                  </TableCell>
                  <TableCell>{boxer.name}</TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {boxer.country}
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {boxer.age}
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {boxer.weight}
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {boxer.stance}
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    {boxer.level}
                  </TableCell>
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

                {/* delete confirm */}
                <TableRow>
                  <TableCell colSpan={8} sx={{ p: 0 }}>
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
                            <Check color="success" />
                          </IconButton>
                          <IconButton onClick={() => setOpenModalId(null)}>
                            <Close color="error" />
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

        {/* only count the filtered+sorted rows */}
        <TablePagination
          component="div"
          count={sorted.length}
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

      {/* Detail dialog */}
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
              <Typography variant="h6">{selectedBoxer.name}</Typography>
              {(
                ['Country', 'Age', 'Weight (kg)', 'Stance', 'Level'] as const
              ).map((label, i) => {
                const key = (
                  ['country', 'age', 'weight', 'stance', 'level'] as const
                )[i] as keyof Boxer;
                return (
                  <Box
                    key={label}
                    display="flex"
                    justifyContent="space-between"
                    my={1}
                  >
                    <Typography color="textSecondary">{label}:</Typography>
                    <Typography>{selectedBoxer[key]}</Typography>
                  </Box>
                );
              })}
              <Box textAlign="right" mt={2}>
                <Button
                  className="dialog-button"
                  onClick={() => setDialogOpen(false)}
                >
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BoxersTable;
