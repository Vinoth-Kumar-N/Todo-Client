import React from 'react'
import LandBg from '../assets/LandBg.png'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Landing = () => {
  return (
    <>
    <Navbar />
      <div className='h-[100vh] md:h-[50vh] w-screen flex justify-center items-center '>
        <section className="md:flex h-auto w-[100vw] justify-center items-center p-16 mt-96">

          <div className="w-fulls md:w-1/2 h-full flex-col justify-center items-center ">

            <div className="w-full md:w-1/2 h-auto flex gap-7">
              <h1 className="w-[35rem] text-2xl sm:text-4xl font-bold text-black/100 leading-relaxed md:leading-loose ">
                Welcome to <span className="text-3xl sm:text-6xl font-bold text-[#99a5b8] ">1StepAhead</span>
                <span className="text-4xl font-bold"> Schedule your Tasks and Be Productive</span>
              </h1>
            </div>


            <div className="w-full md:w-1/2 h-auto flex gap-7 ">
              <button className="w-[50rem] h-[50px] bg-blue-700 m-5 rounded-lg text-lg hover:bg-blue-600 hover:shadow-xl"><Link to='/register' >Regsiter</Link></button>
              <button className="w-[50rem] h-[50px] bg-gray-500 m-5 rounded-lg text-lg hover:bg-gray-600 hover:shadow-2xl"><Link to='/login' >Login</Link></button>
            </div>

          </div>

          <div className="w-full md:w-1/2 h-auto">
            <img src={LandBg} alt="" className="w-auto h-[500px]" />
          </div>

        </section>
      </div>
    </>
  )
}

export default Landing
