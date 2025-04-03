import React from 'react'
import { assets } from '../assets/assets.js'
import Navabar from '../components/Navabar.jsx'
import Header from '../components/header.jsx'

const Home = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
        <Navabar />
        <Header />
    </div>
  )
}

export default Home
