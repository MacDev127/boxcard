import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';
import './EditBoxerPage.css';

interface BoxerFormData {
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
  profileImage: string;
}

const EditBoxerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BoxerFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch boxer data by ID
    axios
      .get(`http://localhost:5002/api/boxers/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch boxer information.');
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    try {
      await axios.put(`http://localhost:5002/api/boxers/${id}`, formData);
      navigate('/dashboard/manage-boxer');
    } catch (err) {
      console.error(err);
      setError('Error updating boxer. Please try again.');
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" className="edit-boxer-container">
      <Typography variant="h5" gutterBottom>
        Edit Boxer
      </Typography>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className="edit-boxer-form">
        <div className="edit-boxer-form-grid">
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
            value={formData.age}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
          <TextField
            label="Weight (KG)"
            name="weight"
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
            value={formData.fightsWon}
            onChange={handleChange}
            fullWidth
            margin="normal"
            className="form-field"
          />
          <TextField
            label="Fights Lost"
            name="fightsLost"
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
            className="form-field full-width"
          />
        </div>
        <div className="edit-boxer-button">
          <Button type="submit" variant="contained" color="primary">
            Update Boxer
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default EditBoxerPage;
