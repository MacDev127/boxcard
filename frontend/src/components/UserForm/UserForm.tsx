const UserForm = () => {
  return (
    <div className="w-screen font-sans text-gray-900 bg-white">
      <div className="">
        <div className="w-full mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
          <div className="py-12 mx-2 text-center md:mx-auto md:w-2/3 md:py-20">
            <h1 className="mb-4 text-3xl font-black leading-4 sm:text-5xl xl:text-6xl">
              Sign up
            </h1>
            <div className="text-lg sm:text-xl">
              <div className="">
                <p className="mb-4">
                  Let's do this! Start your free trial by filling in our simple
                  form below. You will be hearing from us soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pb-16 mx-auto md:w-2/3 sm:max-w-screen-sm md:max-w-screen-md lg:w-1/3 lg:max-w-screen-lg xl:max-w-screen-xl">
        <form className="px-8 py-10 mb-4 border border-gray-100 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="name">
              Full Name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight border border-gray-300 rounded shadow-sm outline-none appearance-none cursor-text ring-blue-500 focus:ring"
              id="name"
              type="name"
              placeholder="Full Name"
              required
            />
            <span className="block my-2"></span>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="email">
              E-mail
            </label>
            <input
              className="w-full px-3 py-2 leading-tight border border-gray-300 rounded shadow-sm outline-none appearance-none cursor-text ring-blue-500 focus:ring"
              id="email"
              type="email"
              placeholder="email"
              required
            />
            <span className="block my-2"></span>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 leading-tight border border-gray-300 rounded shadow-sm outline-none appearance-none cursor-text ring-blue-500 focus:ring"
              id="password"
              type="password"
              placeholder="******************"
              required
            />
          </div>

          <div className="flex items-center">
            <div className="flex-1"></div>
            <button
              className="px-8 py-2 text-lg font-bold text-center text-white bg-blue-600 rounded cursor-pointer"
              type="submit"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
