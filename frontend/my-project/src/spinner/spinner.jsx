import React from 'react';

const Spinner = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#4c296f] to-[#ff5d21] flex justify-center items-center">
      <div className="flex justify-center items-center space-x-4">
        <div className="w-16 h-16 border-4 border-t-4 border-[#ffd700] border-solid rounded-full animate-spin"></div>
        <p className="text-2xl font-bold text-white">Loading...</p>
      </div>
    </div>
  );
};

export default Spinner;
