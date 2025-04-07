import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navabar from "../components/Navabar";
import { AppContext } from "../context/Appcontext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {backend_url,setLoggedIn,loggedIn,getUserData,token,setToken} = useContext(AppContext)
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email:email,
        password:password
      }
      const { data: response } = await axios.post(
        `${backend_url}/api/user/login`,
        data
      );
      console.log(response)
      if (response.success) {
        localStorage.setItem("token", response.token);
        setToken(response.token);
        console.log(response)
        navigate("/"); // Redirect to home
        toast.success(response.message)
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error)
    }

  }
  return (
    <>
      <Navabar />
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <form onSubmit={onSubmitHandler} className="bg-white p-8 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
            Login Page
          </h2>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter the password"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <p className="text-sm text-gray-600">
              I acknowledge and agree to the terms and conditions.
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Forgot password?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/reset-password")}
            >
              click here
            </span>
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Don't have an account?
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              {" "}
              Signup here
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
