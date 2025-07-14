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

      // Redirect based on user role
      if (user.role === 'admin') {
        window.location.href = '/dashboard/analytics';
      } else {
        window.location.href = '/';
      }
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
    <div className="flex flex-wrap justify-center w-screen h-screen align-center text-slate-800">
      {/* Form Section */}

      <div className="flex flex-col w-full md:w-1/2">
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-6 md:justify-center lg:w-[28rem]">
          <div className="pb-6 text-white">
            <a href="/">
              <img
                src={hero}
                alt="Hero"
                className="object-cover w-10/12 max-w-lg mx-auto rounded-lg"
              />
            </a>
          </div>
          <p className="mt-1 text-left font-medium md:text-center text-[#8c8f98]">
            Dont have an account?
            <a
              href="/register"
              className="ml-2 font-semibold text-[#6a9eed]! underline!
              whitespace-nowrap "
            >
              Get Started
            </a>
          </p>

          <form
            className="flex flex-col items-stretch md:pt-2"
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
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-[#272e3c] py-3 px-4 text-base text-white placeholder-gray-400 rounded-md focus:outline-none"
                required
              />
            </div>
            <p className="mt-6 text-sm text-left text-[#8c8f98]">
              <a
                href="/forgot-password"
                className="underline! text-white hover:text-[#6a9eed]"
              >
                Forgot your password?
              </a>
            </p>

            <button
              type="submit"
              className="mt-3 rounded-lg bg-[#6a9eed] px-4 py-2 text-black font-semibold hover:bg-[#90b3f1] transition cursor-pointer"
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
