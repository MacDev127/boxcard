import React from 'react';
import axios from 'axios';
import './AddBoxer.css';
import BoxerForm, {
  BoxerFormData,
} from '../../../components/BoxerForm/BoxerForm';

const defaultData: BoxerFormData = {
  name: '',
  country: '',
  sex: '',
  club: '',
  province: '',
  age: 0,
  weight: 0,
  stance: '',
  level: '',
  fightsWon: 0,
  fightsLost: 0,
  videoUrl: '',
  profileImage: '',
};

const AdminAddBoxer: React.FC = () => {
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
    // Append file if provided
    if (file) {
      formData.append('profileImage', file);
    }

    await axios.post('http://localhost:5002/api/boxers', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  return (
    <div className="add-boxer">
      <BoxerForm
        initialData={defaultData}
        onSubmit={handleSubmit}
        submitLabel="Add Boxer"
      />
    </div>
  );
};

export default AdminAddBoxer;
