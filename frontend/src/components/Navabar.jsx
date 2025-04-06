import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import axios from "axios";

const Navabar = () => {
  const navigate = useNavigate();
  const [state,setState] = useState(false)
  const { token,setToken,userData,backend_url } = useContext(AppContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    navigate("/login");
  };
  const sendVerificationOTP = async () => {
    try {
      axios.defaults.withCredentials = true;
      
      const {data} = await axios.post(`${backend_url}/api/user/send-verify-otp`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },})
      console.log(data)
      if(data.success){
        navigate('/verify-email')
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2" >
          <img src={assets.logo} alt="" className="h-10 w-10" />
          <h3 className="text-white hover:text-gray-300">User Profile</h3>
          {state}
        </div>
        
        {token ? (
          <div onClick = {() =>setState(!state) }>
            <img
              src={assets.profile}
              alt="User"
              className="rounded-full mb-4 w-10 h-10 justify-center"
            />
          </div>
          
        ) : (
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
        )}
        {
            state && <div
            className={`absolute right-12 top-12 mt-2 w-48 bg-gray-800 rounded-md shadow-lg transition-all duration-300 ease-in-out ${
              state ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            <div className="py-2 text-white">
              {
                !userData.isVerified && (<div className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick = {sendVerificationOTP}>Verify Email</div>)
              }
              
              <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Edit Profile</div>
              <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>Logout</div>
             
            </div>
          </div>
        
          }
      </div>
    </div>
  );
};

export default Navabar;
