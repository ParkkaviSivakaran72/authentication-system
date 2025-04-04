import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navabar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={assets.logo} alt="" className="h-10 w-10" />
          <h3 className="text-white hover:text-gray-300">User Profile</h3>
        </div>

        <div className="flex space-x-4">
          <button onClick={() => navigate("/login")}>
            <h3 className="text-white hover:text-gray-300 cursor-pointer">
              Signin
            </h3>
          </button>
          <button onClick={() => navigate("/signup")}>
            <h3 className="text-white hover:text-gray-300 cursor-pointer">
              Signup
            </h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navabar;
