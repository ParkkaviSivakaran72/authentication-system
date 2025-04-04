import React from 'react'
import { assets } from '../assets/assets.js'

const Header = () => {
  return (
    <div class="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center ">
    

    <div class="flex flex-col items-center bg-gray-900 p-8 rounded-xl shadow-lg ">
        <img src={assets.profile} alt="User" class="rounded-full mb-4 w-20 h-20" />
        <h1 class="text-2xl font-bold">Welcome user 👋</h1>
        <p class="text-gray-300">Welcome back! You’re successfully signed in. Enjoy exploring!</p>
        <button class="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Get started</button>
    </div>
</div>

  )
}

export default Header
