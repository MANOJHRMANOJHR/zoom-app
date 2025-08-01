import axios from "axios";
import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import LoginPage from "./login.jsx";
import RegisterPage from "./register.jsx";

const AuthPage = () => {

  const routeTo = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true); // True for Login, False for Register
  //const [isLoggedIn, setIsLoggedIn] = useState(false); // To track login status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? `${import.meta.env.SERVER}/login` : `${import.meta.env.SERVER}/register`;
      const response = await axios.post(url, formData);

      if (isLogin) {
        // Login successful
        console.log("Login successful", response.data);
        alert( "Login successful!");
       // setIsLoggedIn(true); // Update state to render HeroPage
routeTo("/home");
      } else {
        // Registration successful
        console.log( "Registration successful:", response.data);
        alert( "Registration successful!");
        setIsLogin(true); // Switch to Login form
      }



    
    } catch (error) {
      console.error(isLogin ? "Error during login" : "Error during registration:", error);
      alert(isLogin ? "Login failed. Please try again." : "Registration failed. Please try again.");
    }
  };
/*
  if (isLoggedIn) {
    / If the user is logged in, render the HeroPage
    return <Home />;
  }*/

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4c296f] px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border-t-4 border-[#FFD700]">
        {/* Toggle Links */}
        <div className="flex justify-between mb-4">
          <button
            className={`text-lg font-bold ${isLogin ? "text-[#FF5D21]": "text-[#4B0082]"} `}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`text-lg font-bold ${!isLogin ?"text-[#FF5D21]" : "text-[#4B0082]"} `}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Conditionally Render Login or Register Form */}
        {isLogin ? (
          <LoginPage handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} />
        ) : (
          <RegisterPage handleChange={handleChange} formData={formData} handleSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
