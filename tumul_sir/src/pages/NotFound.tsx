import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl">
        {/* Left Side - Image */}
        <img
          src='/bg.jpg'
          alt="404 Illustration"
          className="w-72 md:w-80"
        />

        {/* Right Side - Text */}
        <div className="text-center md:text-left">
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mt-2">
            Page Not Found!
          </h2>
          <p className="text-gray-500 mt-4 max-w-md">
            We're sorry, the page you requested could not be found. Please go
            back to the homepage!
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded transition duration-200"
            >
              GO HOME
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
