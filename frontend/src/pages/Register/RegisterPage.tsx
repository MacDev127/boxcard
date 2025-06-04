import React, { useState } from 'react';
import axios from 'axios';
import hero from '../../images/hero.png';
import Swal from 'sweetalert2';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
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
    }
  };

  return (
    <div className="flex w-screen flex-wrap text-slate-800">
      {/* Left Hero Section */}
      <div className="relative hidden h-screen select-none flex-col justify-center bg-[#272E3C] text-center md:flex md:w-1/2">
        <div className="mx-auto py-16 px-8 text-white xl:w-[40rem]">
          <img
            src={hero}
            alt="Hero"
            className="mx-auto w-9/12 max-w-lg rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex w-full flex-col  md:w-1/2">
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:text-left text-white">
            Create your free account
          </p>
          <p className="mt-6 text-center font-medium md:text-left text-[#8c8f98]">
            Already Registered
            <a
              href="#"
              className="whitespace-nowrap underline decoration-white text-white ml-2 font-semibold"
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

            <div className="block pt-4 flex mt-3 align-">
              <input
                className="mr-2 h-5 w-5 rounded border border-gray-300 text-blue-600 focus:ring-blue-600"
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
