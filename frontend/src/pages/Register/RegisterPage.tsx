import React, { useState } from 'react';
import axios from 'axios';
import hero from '../../images/hero.png';
import Swal from 'sweetalert2';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      Swal.fire({
        title: 'Passwords Do Not Match',
        text: 'Please make sure both passwords are the same.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5002/api/auth/signup',
        form
      );
      console.log('Signup success:', res.data);

      Swal.fire({
        title: 'Account Registered',
        icon: 'success',
        confirmButtonText: 'Back',
      }).then(() => {
        window.location.href = '/';
      });
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);

      const message =
        error.response?.data?.message === 'Email already exists'
          ? 'This email is already in use. Please try logging in or use another email.'
          : error.response?.data?.message ||
            'Something went wrong. Please try again.';

      Swal.fire({
        title: 'Registration Failed',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK',
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
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
          <p className="text-3xl font-bold text-center text-white md:text-left">
            Create your free account
          </p>
          <p className="mt-6 text-center font-medium md:text-left text-[#8c8f98]">
            Already Registered
            <a
              href="/login"
              className="ml-2 font-semibold text-white underline whitespace-nowrap decoration-white"
            >
              Login here
            </a>
          </p>

          <form
            className="flex flex-col items-stretch pt-3 md:pt-8"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col pt-4">
              <input
                type="text"
                required
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-[#272e3c] py-3 px-4 text-base text-white placeholder-gray-400 rounded-md focus:outline-none"
              />
            </div>

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
            <div className="flex flex-col pt-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full bg-[#272e3c] py-3 px-4 text-base text-white placeholder-gray-400 rounded-md focus:outline-none"
                required
              />
            </div>

            <div className="flex block pt-4 mt-3 align-">
              <input
                className="w-5 h-5 mr-2 text-blue-600 border border-gray-300 rounded focus:ring-blue-600"
                type="checkbox"
                id="terms"
                defaultChecked
                readOnly
              />
              <label htmlFor="terms" className="text-[#8c8f98]">
                I agree to the{' '}
                <a className="underline" href="#">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 rounded-lg bg-[#6a9eed] px-4 py-2 text-white font-semibold hover:bg-[#90b3f1] transition"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
