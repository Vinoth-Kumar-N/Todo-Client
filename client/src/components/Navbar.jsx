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
    const [loggedout, setLoggedout] = useState(false);

    const NavLinks = [
        { title: "Home", path: '/' },
        { title: "Register", path: '/register' },
        { title: "Login", path: '/login' }
    ]

    const handleLogout = () => {
        AuthServices.logout();
        setLoggedout(true);
        window.location.reload();
        navigate('/');
    }

    useEffect(() => {
        const data = getUserdata();
        console.log(data);
        setLoggedout(!AuthServices.isAuthenticated());
    }, [loggedout])

    return (
        <>
            <nav className="fixed top-0 h-16 w-full md:w-full rigth-0 bg-[#99a5b8] flex justify-between items-center z-50">
                <div className="ml-8">
                    <Link to={'/'} ><h1 className="cursor-pointer font-extrabold text-2xl text-[#000] h-full rounded-sm flex justify-center items-center hover:text-[#7E60BF]">1StepAhead</h1></Link>
                </div>
                <div className="hidden absolute right-3 xl:mr-20 sm:flex">
                    <ul className="flex">
                        <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-black/60 active:border-b-3 active:border-blue-50 w-[7rem] mr-6 mt-1"><Link to={'/'} >Home</Link></li>
                        {AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-black/60 w-[7rem] mr-6 mt-1"><Link to={'/todolist'} >My Task</Link></li> : null}
                        {AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-black/60  w-[7rem] mr-6 mt-1"><Link onClick={handleLogout} to={'/'} >Logout</Link></li> : null}
                        {!AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-black/60  w-[7rem] mr-6 mt-1"><Link to={'/register'} >Register</Link></li> : null}
                        {!AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-black/60  w-[7rem] mr-6 mt-1"><Link to={'/login'} >Login</Link></li> : null}
                    </ul>
                    <div>
                        <a href="https://github.com/Vinoth-Kumar-N/Todo-Client/tree/main/client" className=""><Waypoints href='' className='text-[#FFE1FF] hover:text-[#7E60BF] mt-2' /></a>
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
                        <div>
                        <a href="https://github.com/Vinoth-Kumar-N/Todo-Client/tree/main/client" target='_blank' className=""><Waypoints href='' className='text-[#FFE1FF] hover:text-[#7E60BF]' /></a>
                        </div>
                        <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-black/60 active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/'} >Home</Link></li>
                        {AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-black/60 active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/todolist'} >My Task</Link></li> : null}
                        {AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-black/60 active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link onClick={handleLogout} to={'/'} >Logout</Link></li> : null}
                        {!AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-black/60 active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/register'} >Register</Link></li> : null}
                        {!AuthServices.isAuthenticated() ? <li className="font-bold text-xl  h-full rounded-sm flex justify-center items-center text-black/60 active:border-b-3 active:border-blue-50 w-[7rem] mr-6"><Link to={'/login'} >Login</Link></li> : null}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Navbar;