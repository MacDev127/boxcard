import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem } from '@mui/material';
import './AddContest.css';

interface Boxer {
  name: string;
  id: string;
}

const AddContestPage = () => {
  const [boxers, setBoxers] = useState<Boxer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    date: '',
    result: '',
    boxer1Id: '',
    boxer2Id: '',
    winnerId: '',
    competition: '',
  });

  useEffect(() => {
    const fetchBoxers = async () => {
      try {
        const response = await axios.get<Boxer[]>('/api/boxers');
        setBoxers(response.data);
      } catch (error) {
        console.error('Error fetching boxers:', error);
        setBoxers([]);
      }
    };

    fetchBoxers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('/api/contests', form);
      setForm({
        date: '',
        result: '',
        competition: '',
        boxer1Id: '',
        boxer2Id: '',
        winnerId: '',
      });
    } catch {
      console.error('error');
      setError('error');
    }
  };

  return (
    <div className="add-contest">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Date"
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm((form) => ({ ...form, date: e.target.value }))
          }
        />
        <TextField
          select
          className="input-select"
          label="Boxer 1"
          value={form.boxer1Id}
          onChange={(e) =>
            setForm((form) => ({ ...form, boxer1Id: e.target.value }))
          }
        >
          {boxers.map((boxer) => (
            <MenuItem key={boxer.id} value={boxer.id}>
              {boxer.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ color: 'white' }}
          className="input-select"
          select
          label="Boxer 2"
          value={form.boxer2Id}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, boxer2Id: e.target.value }))
          }
          required
        >
          {boxers.map((boxer) => (
            <MenuItem key={boxer.id} value={boxer.id}>
              {boxer.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          className="input-select"
          label="Winner"
          value={form.winnerId}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, winnerId: e.target.value }))
          }
          required
        >
          {boxers.map((boxer) => (
            <MenuItem key={boxer.id} value={boxer.id}>
              {boxer.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Add Boxer 2 and Winner dropdowns here */}
        <TextField
          label="Competition"
          value={form.competition}
          onChange={(e) =>
            setForm((form) => ({ ...form, competition: e.target.value }))
          }
        />
        <TextField
          label="Result"
          value={form.result}
          onChange={(e) =>
            setForm((form) => ({ ...form, result: e.target.value }))
          }
        />
        <Button type="submit">Create Contest</Button>
        {error && <p>Error submitting form</p>}
      </form>
    </div>
  );
};

export default AddContestPage;
