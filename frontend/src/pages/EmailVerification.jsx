import React from "react";

const EmailVerification = () => {
  const inputRefs = React.useRef([]);
  const handleLength = (e,index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length-1){
      inputRefs.current[index+1].focus(); 
    }
  }
  const handleLockDown = (e,index) => {
    if(e.key === "Backspace" && index > 0 && e.target.value === ""){
      inputRefs.current[index-1].focus();
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Verify Email</h1>
          <p className="text-gray-600 mt-2">Enter your 6-digit OTP below.</p>
        </div>
        <div className="flex justify-center items-center">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                ref = {(e) => inputRefs.current[index] = e}
                onInput={(e) => handleLength(e,index)}
                onKeyDown={(e) => handleLockDown(e,index)}
                className="m-1 w-12 h-12 bg-blue-600 text-white text-center text-xl rounded-md"
              />
            ))}
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-200"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
