import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './AdminDashboard.css';

interface BoxerFormData {
  name: string;
  country: string;
  sex: string;
  profileImage: string;
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
    profileImage: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    // Convert numeric values from strings to numbers
    const payload = {
      ...formData,
      age: Number(formData.age),
      weight: Number(formData.weight),
      fightsWon: Number(formData.fightsWon),
      fightsLost: Number(formData.fightsLost),
    };

    try {
      const response = await axios.post(
        'http://localhost:5002/api/boxers',
        payload
      );
      setSuccessMessage('Boxer added successfully!');
      // Reset the form fields
      setFormData({
        name: '',
        country: '',
        sex: '',
        profileImage: '',
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
    } catch (err) {
      console.error(err);
      setError('Error adding boxer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="dashboard">
        <Navbar />
        <div className="admin">
          <h2>Add New Boxer</h2>
          <form onSubmit={handleSubmit}>
            <div>
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

            <div>
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

            <div>
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

            <div>
              <label htmlFor="profileImage">Profile Image URL:</label>
              <input
                type="text"
                id="profileImage"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="club">Club:</label>
              <input
                type="text"
                id="club"
                name="club"
                value={formData.club}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="province">Province:</label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div>
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

            <div>
              <label htmlFor="stance">Stance:</label>
              <input
                type="text"
                id="stance"
                name="stance"
                value={formData.stance}
                onChange={handleChange}
                required
              />
            </div>

            <div>
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

            <div>
              <label htmlFor="fightsWon">Fights Won:</label>
              <input
                type="number"
                id="fightsWon"
                name="fightsWon"
                value={formData.fightsWon}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="fightsLost">Fights Lost:</label>
              <input
                type="number"
                id="fightsLost"
                name="fightsLost"
                value={formData.fightsLost}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="videoUrl">Video URL:</label>
              <input
                type="text"
                id="videoUrl"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Add Boxer'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminAddBoxer;
