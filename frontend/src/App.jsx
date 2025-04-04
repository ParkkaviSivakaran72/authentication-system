import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import EmailVerification from './pages/EmailVerification'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer /> 
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/reset-password' element={<ResetPassword />}></Route>
        <Route path='/verify-email' element={<EmailVerification />}></Route>
      </Routes>
    </div>
  )
}

export default App