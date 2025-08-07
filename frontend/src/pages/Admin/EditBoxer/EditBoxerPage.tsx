import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography } from '@mui/material';
import BoxerForm, {
  BoxerFormData,
} from '../../../components/BoxerForm/BoxerForm';
import './EditBoxerPage.css';
import Swal from 'sweetalert2';

const EditBoxerPage = () => {
  const { id } = useParams<{ id: string }>();
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
      formData.append(
        key,
        value !== null && value !== undefined ? value.toString() : ''
      );
    });
    if (file) {
      formData.append('profileImage', file);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    await axios.put(`http://localhost:5002/api/boxers/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (formData) {
      Swal.fire({
        title: 'Boxer Updated',
        icon: 'success',
        confirmButtonText: 'Go to Dashboard',
      }).then(() => {
        window.location.href = '/dashboard/manage-boxer';
      });
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      {error && <Typography color="error">{error}</Typography>}
      <BoxerForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Edit Boxer"
        mode="edit"
      />
    </Container>
  );
};

export default EditBoxerPage;
