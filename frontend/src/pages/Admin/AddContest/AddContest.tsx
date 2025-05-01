import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem } from '@mui/material';
import './AddContest.css';

interface Boxer {
  name: string;
  id: number;
}

interface ContestForm {
  date: string;
  result: string;
  competition: string;
  boxer1Id: number | string;
  boxer2Id: number | string;
  winnerId: number | string;
}

const AddContestPage = () => {
  const [boxers, setBoxers] = useState<Boxer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ContestForm>({
    date: '',
    result: '',
    competition: '',
    boxer1Id: '',
    boxer2Id: '',
    winnerId: '',
  });

  const RESULT_OPTIONS = [
    'W-UD',
    'W-SD',
    'L-UD',
    'L-SD',
    'W-TKO',
    'L-TKO',
    'W-KO',
    'L-KO',
    'W-DQ',
    'L-DQ',
  ] as const;

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
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <TextField
            className="input-select"
            type="date"
            required
            value={form.date}
            fullWidth
            margin="normal"
            onChange={(e) =>
              setForm((form) => ({ ...form, date: e.target.value }))
            }
          />
          <TextField
            select
            className="input-select"
            fullWidth
            margin="normal"
            label="Boxer 1"
            value={form.boxer1Id}
            onChange={(e) =>
              setForm((form) => ({ ...form, boxer1Id: Number(e.target.value) }))
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
            fullWidth
            margin="normal"
            className="input-select"
            select
            label="Boxer 2"
            value={form.boxer2Id}
            onChange={(e) =>
              setForm((form) => ({ ...form, boxer2Id: Number(e.target.value) }))
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
            fullWidth
            margin="normal"
            label="Winner"
            value={form.winnerId}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, winnerId: Number(e.target.value) }))
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
            fullWidth
            margin="normal"
            onChange={(e) =>
              setForm((form) => ({ ...form, competition: e.target.value }))
            }
          />
          <TextField
            select
            label="Result"
            className="input-select"
            fullWidth
            margin="normal"
            value={form.result}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, result: e.target.value }))
            }
            required
          >
            {RESULT_OPTIONS.map((code) => (
              <MenuItem key={code} value={code}>
                {code}
              </MenuItem>
            ))}
          </TextField>
          <div className="form__btn-wrapper">
            <Button
              type="submit"
              id="boxer-form-btn"
              variant="contained"
              color="primary"
            >
              Create Contest
            </Button>
          </div>

          {error && <p>Error submitting form</p>}
        </form>
      </div>
    </div>
  );
};

export default AddContestPage;
