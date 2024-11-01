import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { CircleX, Waypoints } from 'lucide-react';
import { Dropdown } from 'antd'
import '../assets/css/Navbar.css';
import { getUserdata, removeUserdata } from '../services/storageServices';
import AuthServices from '../services/authServices.js';


const Navbar = () => {
    const navigate = useNavigate();
    const [click, setclick] = useState(false);



    const NavLinks = [
        { title: "Home", path: '/' },
        { title: "Register", path: '/register' },
        { title: "Login", path: '/login' }
    ]

    const handleLogout = () => {
        AuthServices.logout();
        navigate('/');
    }

    useEffect(() => {
        const data = getUserdata();
        console.log(data);
    }, [])



    const [visible, setVisible] = useState(true);
    return (
        <>
            {
                visible ? (
                    <>
                        <nav className="fixed top-0 h-16 w-full md:w-full rigth-0 bg-[#99a5b8] flex justify-between items-center z-50">
                            <div className="ml-8">
                                <h1 className="cursor-pointer font-extrabold text-2xl text-[#816081] h-full rounded-sm flex justify-center items-center hover:text-[#7E60BF]">1StepAhead</h1>
                            </div>
                            <div className="hidden absolute right-3 xl:mr-20 sm:flex">
                                <ul className="flex">
                                    <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-[#000] active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/'} >Home</Link></li>
                                    {AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-[#000] active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/todolist'} >My Task</Link></li> : null}
                                    {AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-[#000] active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link onClick={handleLogout} to={'/'} >Logout</Link></li> : null}
                                    {!AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-[#000] active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/register'} >Register</Link></li> : null}
                                    {!AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-[#000] active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/login'} >Login</Link></li> : null}
                                </ul>
                                <div onClick={() => setVisible(!visible)}>
                                    <Waypoints href='' className='text-[#FFE1FF] hover:text-[#7E60BF]' />
                                </div>
                            </div>
                            <div className="w-6 mr-6">
                                <Bars3Icon onClick={() => setclick(true)} className='sm:hidden font-bold text-xl text-[#FFE1FF] h-full rounded-sm flex justify-center items-center hover:text-[#000] z-40'></Bars3Icon>
                            </div>

                        </nav>
                        <div className={click ? 'nav-menu active' : 'nav-menu'}>
                            <XMarkIcon className='md:hidden absolute right-0 w-6 h-6 text-[#FFE1FF] mr-3 mt-3 bg-[#99a5b8] z-50' onClick={() => setclick(false)} />
                            <div className="">
                                <ul className="w-full h-[40vh]  flex flex-col justify-start mt-10 items-center bg-[#99a5b8]">
                                    <div onClick={() => setVisible(!visible)}>
                                        <Waypoints className='text-[#FFE1FF] hover:text-[#7E60BF] bg-[#99a5b8]' />
                                    </div>
                                    <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-[#000] active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/'} >Home</Link></li>
                                    {AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-[#000] active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/todolist'} >My Task</Link></li> : null}
                                    {AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-[#000] active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link onClick={handleLogout} to={'/'} >Logout</Link></li> : null}
                                    {!AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-[#000] active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/register'} >Register</Link></li> : null}
                                    {!AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-[#000] active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/login'} >Login</Link></li> : null}
                                </ul>
                            </div>
                        </div>
                    </>



                ) : (
                    <>
                        <div className="h-screen w-screen absolute top-0 left-0 bg-[#0B192C] flex justify-center items-center" >
                            <div className="h-3/6 w-[80%] md:w-[25%] flex flex-col justify-center items-center bg-[#142742] rounded-md shadow-2xl shadow-purple-600">
                                <div className=" w-full h-[2rem] flex justify-between bg-[#142742]">
                                    <div className=" w-5/6 h-[1rem] text-center ml-[2rem]">
                                        <h3 className="font-monos text-[#F5EFFF] text-3xl font-bold bg-[#142742]">Admin Login*</h3>
                                    </div>
                                    <div className="w-1/6 h-[2rem] bg-[#142742]" onClick={() => setVisible(!visible)}>
                                        <CircleX className='bg-[#142742] text-[#F5EFFF]' />
                                    </div>
                                </div>
                                <form className="w-[80%] h-[70%] flex flex-col justify-center items-center gap-4 bg-[#142742]">
                                    <input type="email" id="email" placeholder="Email" className="p-3 bg-[#f0eded] w-full font-bold outline-none active:outline-none focus:border-b-2 hover:border-blue-500" />
                                    <input type="password" id="password" placeholder="Password" className="p-3 bg-[#f0eded] w-full font-bold outline-none active:outline-none focus:border-b-2 hover:border-blue-500" />
                                    <button type="submit" className="w-full bg-purple-600 text-white p-3">Login</button>
                                </form>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
export default Navbar;