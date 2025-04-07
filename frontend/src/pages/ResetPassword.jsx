import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/Appcontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  axios.defaults.withCredentials = true;
  const [email,setEmail] = useState("");
  const {backend_url} = useContext(AppContext)
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        email:email
      }
      const {data:response} = await axios.post(`${backend_url}/api/user/send-reset-otp`,data)
      if(response.success){
        navigate('/reset-password-setup');
        toast.success(response.message);
        localStorage.setItem('email',response.email)

      }
      else{
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 px-4">
      <div className=" bg-white shadow-lg  rounded-lg p-8 w-full max-w-md">
        <h2 className="flex text-2xl items-center justify-center font-semibold text-gray-800 mb-2">Reset your password</h2>
        <p className="flex text-gray-600 items-center justify-center  mb-6">Enter your registered email address</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)} 
            placeholder="Enter your email address" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword;
