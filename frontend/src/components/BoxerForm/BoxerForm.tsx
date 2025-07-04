import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
} from '@mui/material';
import './BoxerForm.css';
import Title from '../Title/Title';

export interface BoxerFormData {
  name: string;
  country: string;
  sex: string;
  bio: string;
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

type BoxerFormMode = 'create' | 'edit';

interface BoxerFormProps {
  initialData: BoxerFormData;
  blankData?: BoxerFormData; // 👈 Add this
  onSubmit: (data: BoxerFormData, file?: File) => Promise<void>;
  submitLabel?: string;
  mode: BoxerFormMode;
}

const BoxerForm: React.FC<BoxerFormProps> = ({
  initialData,
  onSubmit,
  blankData,
  submitLabel = '',
  mode,
}) => {
  // Local state for form fields
  const [formData, setFormData] = useState<BoxerFormData>(initialData);

  // Local state for the file selected from the device
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [bioError, setBioError] = useState<string | null>(null);

  // Update the form data if the initial data changes (useful for edit page)
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };
      console.log('Updated Form Data:', updated);
      return updated;
    });
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
      await onSubmit(formData, profileImageFile || undefined);
      setSuccessMessage(mode === 'edit' ? 'Boxer updated!' : 'Boxer added!');

      if (mode === 'create' && blankData) {
        setFormData(blankData); // 👈 much cleaner
        setProfileImageFile(null);
      }
      if (formData) {
        Swal.fire({
          title: 'Boxer Added',
          icon: 'success',
          confirmButtonText: 'Back',
        }).then(() => {
          window.location.href = '/dashboard/add-boxer';
        });
      }
    } catch (err) {
      console.error(err);
      setError('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Always update the form data
    setFormData((prev) => ({ ...prev, bio: value }));

    // Calculate word count (handle empty string case)
    const wordCount =
      value.trim() === '' ? 0 : value.trim().split(/\s+/).length;

    // Set error if over limit
    setBioError(wordCount > 100 ? 'Bio cannot exceed 100 words' : null);
  };

  const sexOptions = ['Male', 'Female'];
  const countryOptions = ['Ireland', 'UK', 'USA', 'Spain', 'Russia', 'France'];
  const provinceOptions = ['Ulster', 'Munster', 'Leinster', 'Connacht'];
  const levelOptions = ['Elite', 'Intermediate', 'Youth', 'Junior'];
  const stanceOptions = ['Orthodox', 'Southpaw', 'Switch Hitter'];

  return (
    <Container maxWidth="md" className="boxer-form-container">
      <Title>Add Boxer</Title>
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
            sx={{ color: 'white' }}
          />
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
            {countryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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
            {sexOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Club"
            name="club"
            value={formData.club}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
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
            {provinceOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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
            {stanceOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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
            {levelOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
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
            placeholder="e.g. 12"
            color="primary"
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
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <div className="form-field full-width">
            <TextField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleBio}
              multiline
              rows={5}
              fullWidth
              margin="normal"
              helperText={`${
                formData.bio ? formData.bio.trim().split(/\s+/).length : 0
              }/100 words`}
              placeholder="Write a short Bio (Max 100 words)"
              className="form-field"
              error={!!bioError}
            />

            {bioError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {bioError}
              </Typography>
            )}
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
            {isSubmitting ? 'Submitting...' : submitLabel}
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
