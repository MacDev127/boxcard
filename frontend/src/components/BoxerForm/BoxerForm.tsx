import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import './BoxerForm.css';

export interface BoxerFormData {
  name: string;
  country: string;
  sex: string;
  club: string;
  province: string;
  age: number;
  weight: number;
  stance: string;
  level: string;
  fightsWon: number;
  fightsLost: number;
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
  submitLabel = 'Submit',
  mode,
}) => {
  // Local state for form fields
  const [formData, setFormData] = useState<BoxerFormData>(initialData);

  // Local state for the file selected from the device
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
      console.log('Updated Form Data:', updated); // 👈 ADD THIS
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
    } catch (err) {
      console.error(err);
      setError('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" className="boxer-form-container">
      <Typography variant="h5" gutterBottom>
        {submitLabel}
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
            sx={{ color: 'white' }}
          />
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
          <TextField
            label="Sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
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
            label="Province"
            name="province"
            value={formData.province}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
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
            label="Stance"
            name="stance"
            value={formData.stance}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
          <TextField
            label="Level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
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
