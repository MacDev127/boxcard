import React from 'react';
import UserForm from '@/components/UserForm/UserForm';
import Navbar from '@/components/Navbar/Navbar';
import hero from '../../images/hero.png';

const Register = () => {
  return (
    <div className="flex w-screen flex-wrap text-slate-800">
      <div className="relative hidden h-screen select-none flex-col justify-center bg-[#272E3C] text-center md:flex md:w-1/2">
        <div className="mx-auto py-16 px-8 text-white xl:w-[40rem]">
          <img
            src={hero}
            alt="Hero"
            className="mx-auto w-9/12 max-w-lg rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12">
          <a href="#" className="text-2xl font-bold text-blue-600"></a>
        </div>
        <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
          <p className="text-center text-3xl font-bold md:text-left md:leading-tight text-white">
            Create your free account
          </p>
          <p className="mt-6 text-center font-medium md:text-left text-[#8c8f98]">
            Already Registered
            <a
              href="#"
              className="whitespace-nowrap ml-2 font-semibold text-[#6a9eed]"
            >
              Login here
            </a>
          </p>

          <form className="flex flex-col items-stretch pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-transparent border-1 transition focus-within:border-blue-600">
                <input
                  type="text"
                  id="login-name"
                  className="w-full flex-shrink appearance-none  bg-[#272e3c] py-3 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md  border-transparent border-1 transition focus-within:border-blue-600">
                <input
                  type="email"
                  id="login-email"
                  className="w-full flex-shrink appearance-none  bg-[#272e3c] py-3 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="mb-4 flex flex-col pt-4">
              <div className="relative flex overflow-hidden rounded-md border-1 border-transparent transition focus-within:border-blue-600">
                <input
                  type="password"
                  id="login-password"
                  className="w-full flex-shrink appearance-none  bg-[#272e3c] py-3 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password (minimum 8 characters)"
                />
              </div>
            </div>
            <div className="block">
              <input
                className="bg-[url('data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2020%2020%27%3e%3cpath%20fill=%27none%27%20stroke=%27%23fff%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%20stroke-width=%272%27%20d=%27M6%2010l3%203l6-6%27/%3e%3c/svg%3e')] bg-no-repeat
                bg-center mr-2 h-5 w-5 appearance-none rounded border bg-contain bg-no-repeat align-top text-black shadow checked:bg-blue-600 focus:border-blue-600 focus:shadow"
                type="checkbox"
                id="remember-me"
                checked
              />
              <label className="inline-block" htmlFor="remember-me">
                <span className="text-[#8c8f98] pr-3">I agree to the</span>
                <a className="underline" href="#">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 rounded-lg bg-[#6a9eed] px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 transition hover:bg-[#90b3f1] focus:ring-2 md:w-32"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
