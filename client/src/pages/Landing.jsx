import React from 'react'
import LandBg from '../assets/LandBg.png'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-auto w-screen pt-10 md:pt-0">
        <section className="flex flex-col md:flex-row items-center justify-center w-full p-8 md:p-16 md:mt-20">
          
          <div className="flex flex-col items-center md:items-start md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left text-black leading-relaxed">
              Welcome to <span className="text-3xl md:text-6xl font-bold text-[#99a5b8]">1StepAhead</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl font-semibold text-center md:text-left">
              Schedule your Tasks and Be Productive
            </p>

            <div className="flex gap-4 mt-8 w-full justify-center md:justify-start">
              <Link to="/register">
                <button className="w-40 md:w-32 h-12 bg-blue-700 rounded-lg text-lg text-white hover:bg-blue-600 hover:shadow-xl">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="w-40 md:w-32 h-12 bg-gray-500 rounded-lg text-lg text-white hover:bg-gray-600 hover:shadow-xl">
                  Login
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <img src={LandBg} alt="Landing Background" className="w-full max-w-md md:max-w-full h-auto md:h-[500px]" />
          </div>

        </section>
      </div>
      <Footer />
    </>
  )
}

export default Landing
