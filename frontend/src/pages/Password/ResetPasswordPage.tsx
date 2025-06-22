import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      Swal.fire('Error', 'Passwords do not match', 'error');
      return;
    }

    try {
      await axios.post('http://localhost:5002/api/auth/reset-password', {
        token,
        password: form.newPassword,
      });

      Swal.fire({
        title: 'Password Reset Successful',
        icon: 'success',
        confirmButtonText: 'Return to login',
      }).then(() => {
        navigate('/login');
      });
    } catch (error: any) {
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Invalid or expired link',
        'error'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded">
        <h2 className="mb-4 text-2xl font-bold text-left">
          Set a New Password
        </h2>

        <input
          type="password"
          name="newPassword"
          required
          placeholder="New password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full bg-[#272e3c] py-3 px-4 mb-4 text-base text-white placeholder-gray-400 rounded-md focus:outline-none"
        />

        <input
          type="password"
          name="confirmPassword"
          required
          placeholder="Confirm new password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full bg-[#272e3c] py-3 px-4 mb-6 text-base text-white placeholder-gray-400 rounded-md focus:outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-[#6a9eed] px-4 py-2 text-black font-semibold hover:bg-[#90b3f1] transition cursor-pointer"
        >
          Reset Password
        </button>

        <p className="mt-3 text-sm text-left text-[#8c8f98]">
          <a
            href="/login"
            className="underline text-white hover:text-[#6a9eed]"
          >
            Return to login?
          </a>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
