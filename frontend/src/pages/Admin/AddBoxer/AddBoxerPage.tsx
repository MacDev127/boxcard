import React, { useState } from 'react';
import axios from 'axios';
import './AddBoxer.css';
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
}

const AdminAddBoxer: React.FC = () => {
  const [formData, setFormData] = useState<BoxerFormData>({
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
  });

  // New state for the image file
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for the file input change event
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

    // Create FormData object for multipart/form-data submission
    const data = new FormData();
    data.append('name', formData.name);
    data.append('country', formData.country);
    data.append('sex', formData.sex);
    data.append('club', formData.club);
    data.append('province', formData.province);
    data.append('age', String(formData.age));
    data.append('weight', String(formData.weight));
    data.append('stance', formData.stance);
    data.append('level', formData.level);
    data.append('fightsWon', String(formData.fightsWon));
    data.append('fightsLost', String(formData.fightsLost));
    data.append('videoUrl', formData.videoUrl);

    if (profileImageFile) {
      data.append('profileImage', profileImageFile);
    }

    try {
      await axios.post('http://localhost:5002/api/boxers', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage('Boxer added successfully!');
      setFormData({
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
      });
      setProfileImageFile(null);
    } catch (err) {
      console.error(err);
      setError('Error adding boxer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-boxer">
      <div className="add-boxer__container">
        <h2>Add New Boxer</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form__wrapper">
            <div className="form-column">
              <div className="form__input">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form__input">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form__input">
                <label htmlFor="sex">Sex:</label>
                <select
                  id="sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                >
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form__input">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>{' '}
              <div className="form__input">
                <label htmlFor="club">Club:</label>
                <input
                  type="text"
                  id="club"
                  name="club"
                  value={formData.club}
                  onChange={handleChange}
                />
              </div>
              <div className="form__input">
                <label htmlFor="province">Province:</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-column">
              <div className="form__input">
                <label htmlFor="weight">Weight (KG):</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form__input">
                <label htmlFor="stance">Stance:</label>

                <select
                  id="stance"
                  name="stance"
                  value={formData.stance}
                  onChange={handleChange}
                  required
                >
                  <option value="">Stance</option>
                  <option value="orthodox">Orthodox</option>
                  <option value="southpaw">Southpaw</option>
                </select>
              </div>
              <div className="form__input">
                <label htmlFor="level">Level:</label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="schoolboy">Schoolboy</option>
                  <option value="schoolgirl">Schoolgirl</option>
                  <option value="youth">Youth</option>
                  <option value="junior">Junior</option>
                  <option value="elite">Elite</option>
                </select>
              </div>
              <div className="form__input">
                <label htmlFor="fightsWon">Fights Won:</label>
                <input
                  type="number"
                  id="fightsWon"
                  name="fightsWon"
                  value={formData.fightsWon}
                  onChange={handleChange}
                />
              </div>
              <div className="form__input">
                <label htmlFor="fightsLost">Fights Lost:</label>
                <input
                  type="number"
                  id="fightsLost"
                  name="fightsLost"
                  value={formData.fightsLost}
                  onChange={handleChange}
                />
              </div>
              <div className="form__input">
                <label htmlFor="videoUrl">Video URL:</label>
                <input
                  type="text"
                  id="videoUrl"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                />
              </div>
              <div className="form__input">
                <label htmlFor="profileImage">Profile Image:</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <div className="form__button">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Add Boxer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddBoxer;
