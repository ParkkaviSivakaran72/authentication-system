import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { AppContext } from "../context/Appcontext.jsx";
import { toast } from "react-toastify";

const Header = () => {
    const navigate = useNavigate();
  const { userData, setLoggedIn, setUserData, setToken } =useContext(AppContext);
  

  // Logout function
  

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center bg-gray-900 p-8 rounded-xl shadow-lg">
        <img
          src={assets.profile}
          alt="User"
          className="rounded-full mb-4 w-20 h-20"
        />
        <h1 className="text-2xl font-bold">
          
          {userData ? `Hello, ${userData.userName} 👋` : "Hello, Developer!"}
        </h1>
        <h2 className="text-xl font-bold">Welcome to our web page!</h2>
        <p className="text-gray-300">
          Welcome back! You’re successfully signed in. Enjoy exploring!
        </p>
        <button
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          onClick={() => toast.success("Let's get started!")}
        >
          Get started
        </button>
        
      </div>
    </div>
  );
};

export default Header;
