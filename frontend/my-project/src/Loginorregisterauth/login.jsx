import React from "react";

const LoginPage = ({ handleChange, formData, handleSubmit }) => (
  <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#FFD700]">
    <h2 className="text-2xl font-bold text-center text-[#FF5D21] mb-4">Login</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#4B0082]">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#4B0082]">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#FFD700] focus:border-[#FFD700]"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#FF5D21] text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#E04F18] focus:ring-4 focus:ring-[#FFD700]"
      >
        Login
      </button>
    </form>
  </div>
);

export default LoginPage;
