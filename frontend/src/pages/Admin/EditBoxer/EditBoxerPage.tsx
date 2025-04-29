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
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    if (file) {
      formData.append('profileImage', file);
    }

    // ADD THIS
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    await axios.put(`http://localhost:5002/api/boxers/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    navigate('/dashboard/manage-boxer', { state: { reload: true } });
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
        mode="edit"
      />
    </Container>
  );
};

export default EditBoxerPage;
