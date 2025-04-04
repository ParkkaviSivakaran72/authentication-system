import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navabar from "../components/Navabar";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {backend_url,loggedIn,setLoggedIn,getUserData} = useContext(AppContext);

  const onSubmitHanlder = async (e) => {
    try {
      e.preventDefault();
      console.log(backend_url)
      const {data} = await axios.post(`${backend_url}/api/user/register`,{userName,email,password,confirmPassword})
      console.log(data)
      if(data.success){
        setLoggedIn(true)
        getUserData();
        navigate('/')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }

  }
  return (
    <>
      <Navabar />

      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <form onSubmit = {onSubmitHanlder} className="bg-white p-8 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
            Signup Page
          </h2>

          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Enter your User Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter a valid email address"
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter a password"
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            placeholder="Confirm your password"
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <p className="text-sm text-gray-600">
              I acknowledge and agree to the terms and conditions.
            </p>
          </div>

          <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
            Signup
          </button>

          <p className="mt-4 text-sm text-gray-600">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer hover:underline ml-1"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
