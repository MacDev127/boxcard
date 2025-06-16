import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5002/api/auth/forgot-password', {
        email,
      });
      //   Swal.fire('Check your email', 'Password reset link sent!', 'success');
      Swal.fire({
        title: 'Password reset link sent, Check your email!',
        icon: 'success',
        confirmButtonText: 'Return to login',
      }).then(() => {
        window.location.href = '/login';
      });
    } catch (error) {
      Swal.fire('Error', 'Unable to send reset link', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 rounded ">
        <h2 className="mb-4 text-2xl font-bold text-left">
          Reset Your Password
        </h2>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#272e3c] py-3 px-4 mb-6 text-base text-white placeholder-gray-400 rounded-md focus:outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-[#6a9eed] py-2 bg-[#6a9eed] px-4 py-2 text-black font-semibold hover:bg-[#90b3f1] transition cursor-pointer"
        >
          Send Reset Link
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

export default ForgotPassword;
