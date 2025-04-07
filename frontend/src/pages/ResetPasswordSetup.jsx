import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";

const ResetPasswordSetup = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const { backend_url } = useContext(AppContext);
  const [check, setCheck] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const inputRefs = React.useRef([]);
  const handleLength = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleLockDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const OTPArray = inputRefs.current.map((e) => e.value);
      const otp = OTPArray.join("");
      console.log(otp);
      const data = {
        email: email,
        otp: otp,
      };
      const { data: response } = await axios.post(
        `${backend_url}/api/user/check-reset-otp`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log(data);
      if (response.success) {
        setCheck(true);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      const data = {
        email:email,
        newPassword:newPassword,
        confirmNewPassword:confirmNewPassword
      }
      const {data:response} = await axios.post(`${backend_url}/api/user/reset-password`,data)
      if(response.success){
        navigate('/login')
        toast.success(response.message)
      }
      else{
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 px-4">
      {check === false && (
        <form
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <h2 className="flex align-center justify-center text-2xl font-semibold text-gray-800">
              Reset Your Password
            </h2>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            />
            <div className="flex p-2 justify-center items-center">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    required
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleLength(e, index)}
                    onKeyDown={(e) => handleLockDown(e, index)}
                    onPaste={(e) => handlePaste(e)}
                    className="m-1 w-12 h-12 bg-blue-600 text-white text-center text-xl rounded-md"
                  />
                ))}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Check
            </button>
          </div>
        </form>
      )}
      {check && (
        <form
          onSubmit = {handleResetPassword}
          action=""
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
        >
          <h2 className="flex align-center justify-center text-2xl font-semibold text-gray-800">
            Reset Your Password
          </h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm your new password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordSetup;
