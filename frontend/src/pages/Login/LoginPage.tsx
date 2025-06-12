import React, { useState } from 'react';
import axios from 'axios';
import hero from '../../images/hero.png';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:5002/api/auth/login',
        form
      );

      const { token, user } = res.data;

      // Save token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      Swal.fire({
        title: 'Login Successful',
        icon: 'success',
        confirmButtonText: 'Continue',
      }).then(() => {
        // Redirect based on user role
        if (user.role === 'admin') {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/';
        }
      });
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);

      Swal.fire({
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid credentials',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  return (
    <div className="flex flex-wrap w-screen text-slate-800">
      {/* Left Hero Section */}
      <div className="relative hidden h-screen select-none flex-col justify-center bg-[#272E3C] text-center md:flex md:w-1/2">
        <div className="mx-auto py-16 px-8 text-white xl:w-[40rem]">
          <img
            src={hero}
            alt="Hero"
            className="object-cover w-9/12 max-w-lg mx-auto rounded-lg"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col w-full md:w-1/2">
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-6 md:justify-center lg:w-[28rem]">
          <p className="text-3xl font-bold text-center text-white md:text-center">
            Welcome Back
          </p>
          <p className="mt-6 text-center font-medium md:text-center text-[#8c8f98]">
            Dont have an account?
            <a
              href="/register"
              className="ml-2 font-semibold text-white underline whitespace-nowrap decoration-white"
            >
              Get Started
            </a>
          </p>

          <form
            className="flex flex-col items-stretch pt-3 md:pt-8"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col pt-4">
              <input
                type="email"
                required
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#272e3c] py-3 px-4 text-base text-white placeholder-gray-400 rounded-md focus:outline-none"
              />
            </div>

            <div className="flex flex-col pt-4">
              <input
                type="password"
                name="password"
                placeholder="Password (min 8 characters)"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-[#272e3c] py-3 px-4 text-base text-white placeholder-gray-400 rounded-md focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-6 rounded-lg bg-[#6a9eed] px-4 py-2 text-white font-semibold hover:bg-[#90b3f1] transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
