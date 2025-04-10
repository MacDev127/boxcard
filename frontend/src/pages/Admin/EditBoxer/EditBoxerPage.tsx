import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import BoxerForm, {
  BoxerFormData,
} from '../../../components/BoxerForm/BoxerForm';
import './EditBoxerPage.css';

const EditBoxerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<BoxerFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5002/api/boxers/${id}`)
      .then((res) => {
        setInitialData(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch boxer information.');
      });
  }, [id]);

  const handleSubmit = async (data: BoxerFormData, file?: File) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('country', data.country);
    formData.append('sex', data.sex);
    formData.append('club', data.club);
    formData.append('province', data.province);
    formData.append('age', String(data.age));
    formData.append('weight', String(data.weight));
    formData.append('stance', data.stance);
    formData.append('level', data.level);
    formData.append('fightsWon', String(data.fightsWon));
    formData.append('fightsLost', String(data.fightsLost));
    formData.append('videoUrl', data.videoUrl);
    if (file) {
      formData.append('profileImage', file);
    }

    await axios.put(`http://localhost:5002/api/boxers/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Edit Boxer
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <BoxerForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update Boxer"
      />
    </Container>
  );
};

export default EditBoxerPage;
