import React from 'react'
import { assets } from '../assets/assets.js'

const Header = () => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto">
      <img src={assets.profile} alt="" className="h-20 w-20 rounded-full border-4 border-gray-700" />
      <h1 className="text-3xl font-bold flex items-center space-x-2">
        Welcome user <img src={assets.wave} alt="" className="h-8 w-8 animate-wave" />
      </h1>
      <h3 className="text-lg">Enjoy in our webpage ...</h3>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
        Get started
      </button>
    </div>
  )
}

export default Header
