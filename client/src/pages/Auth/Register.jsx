import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CircleX } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import AuthServices from '../../services/authServices';


const Register = () => {
  const navigate = useNavigate();
  const [statusMess, setstatusMess] = useState(null);
  const unameref = useRef(null);
  const emailref = useRef(null);
  const passwordref = useRef(null);

  const handleSub = async (e) => {
    e.preventDefault();
    const data = {
      username: unameref.current.value,
      email: emailref.current.value,
      password: passwordref.current.value
    }
    await AuthServices.registerUser(data)
      .then((res) => {
        toast('Registered Successfully', { type: "success" })
        console.log(res);
        if (res.status === 201) {
          setTimeout(() => {
            navigate('/todolist');
          }, 2000);
        }
      }).catch((err) => {
        console.log(err);
        toast("Registration Failed", { type: "error" });
      });
  }




  return (
    <>
    <Navbar />
      <ToastContainer />
      <div className="h-[100vh] w-screen bg-black/15 flex justify-center items-center">
        <div className=" h-auto w-[70%] md:w-[30%] flex flex-col  bg-white  shadow-lg p-6">

          <div className="w-full h-[15%] flex items-center justify-between px-10 text-purple-500 bg-white/50 text-xl font-bold shadow-sm">
            <div className="text-2xl m-1">Sign Up</div>
            <div className="text-7xl" onClick={() => navigate('/')} ><CircleX /></div>
          </div>

          <div className="w-full h-full flex flex-col justify-center items-center mt-3">
            <form className="w-[80%] h-[90%] flex flex-col justify-center items-center gap-4" id="contact-form" onSubmit={handleSub}>
            <input type="text" id="unamef" ref={unameref} className="p-3 bg-[#f8f8f8] w-full font-bold outline-none active:outline-none focus:border-b-2  hover:border-b-2 hover:border-purple-200 focus:border-purple-600 mb-3" placeholder="Username" required />
              <input type="email" id="emailf" ref={emailref} className="p-3 bg-[#f8f8f8] w-full font-bold outline-none active:outline-none focus:border-b-2  hover:border-b-2 hover:border-purple-200 focus:border-purple-600 mb-3" placeholder="Email" required />
              <input type="password" id="passwordf" ref={passwordref} className="p-3 bg-[#f8f8f8] w-full font-bold outline-none active:outline-none focus:border-b-2  hover:border-b-2 hover:border-purple-200 focus:border-purple-600 mb-3" placeholder="Password" required />
              <button type="submit" className="text-white bg-slate-500 from-green-500 via-red-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none shadow-purple-100 font-medium rounded-sm text-md px-5 py-2.5 text-center w-full h-[15%] mt-4" >Sign Up</button>
            </form>
            <div className="">{statusMess}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register

