import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';
import './BoxerForm.css';

export interface BoxerFormData {
  name: string;
  country: string;
  sex: string;
  club: string;
  province: string;
  age: number | '';
  weight: number | '';
  stance: string;
  level: string;
  fightsWon: number | '';
  fightsLost: number | '';
  videoUrl: string;
  profileImage?: string;
}

const defaultInitialData: BoxerFormData = {
  name: '',
  country: '',
  sex: '',
  club: '',
  province: '',
  age: '',
  weight: '',
  stance: '',
  level: '',
  fightsWon: '',
  fightsLost: '',
  videoUrl: '',
};

const sexOptions = ['Male', 'Female'];
const countryOptions = ['Ireland', 'UK', 'USA'];
const provinceOptions = ['Ulster', 'Munster', 'Leinster', 'Connacht'];
const levelOptions = ['Elite', 'Intermediate', 'Youth', 'Junior'];
const stanceOptions = ['Orthodox', 'Southpaw'];

const BoxerForm: React.FC = () => {
  const [formData, setFormData] = useState<BoxerFormData>(defaultInitialData);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['age', 'weight', 'fightsWon', 'fightsLost'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Build FormData for multipart upload
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        payload.append(key, val?.toString() ?? '');
      });
      if (profileImageFile) {
        payload.append('profileImage', profileImageFile);
      }

      // POST to your API
      await axios.post('http://localhost:5002/api/boxers', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccessMessage('Boxer successfully added!');

      // Reset form
      setFormData(defaultInitialData);
      setProfileImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error(err);
      setError('Failed to add boxer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" className="boxer-form-container">
      <Typography variant="h5" gutterBottom>
        Add New Boxer
      </Typography>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className="boxer-form">
        <div className="boxer-form-grid">
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />

          <TextField
            select
            label="Sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          >
            {sexOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          >
            {countryOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          >
            {provinceOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />

          <TextField
            label="Weight (KG)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />

          <TextField
            select
            label="Stance"
            name="stance"
            value={formData.stance}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          >
            {stanceOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          >
            {levelOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Fights Won"
            name="fightsWon"
            type="number"
            value={formData.fightsWon}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />

          <TextField
            label="Fights Lost"
            name="fightsLost"
            type="number"
            value={formData.fightsLost}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />

          <TextField
            label="Video URL"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />

          <div className="form-field full-width">
            <label htmlFor="profileImage" className="file-label">
              Profile Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
        </div>

        <div className="boxer-form-button">
          <Button
            id="boxer-form-btn"
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Add Boxer'}
          </Button>
        </div>

        {successMessage && (
          <Typography
            variant="body1"
            sx={{ color: '#22c55e', marginTop: '1rem' }}
          >
            {successMessage}
          </Typography>
        )}
      </form>
    </Container>
  );
};

export default BoxerForm;
