import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Close, Email, Facebook, Instagram,
    PersonOutlined, Phone, SearchOutlined, SearchRounded, Telegram, Twitter, Menu as MenuIcon
} from '@mui/icons-material';
import logo from "../assets/Lancet_CPD_Center-1.jpg";
import { useSelector } from 'react-redux';
import SignOut from '../pages/Authentication/SignOut';


function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [showSearch, setShowSearch] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const handleSearch = () => setShowSearch(!showSearch);
    const handleAccount = () => setShowAccount(!showAccount);
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className="font-lato">
            {/* Top bar */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-2 px-4 md:px-10">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="hidden md:flex text-sm justify-center items-center gap-4 md:gap-10">
                        <h3 className="flex items-center"><Phone fontSize="small" className="mr-2" />+251935616060 / 0912370018</h3>
                        <h3 className="flex items-center"><Email fontSize="small" className="mr-2" />info@lancetconsultancy.com</h3>
                    </div>
                    <ul className="flex justify-between items-center gap-6">
                        <li><a href="#" className="hover:text-blue-200 transition duration-300"><Facebook fontSize="small" /></a></li>
                        <li><a href="#" className="hover:text-blue-200 transition duration-300"><Instagram fontSize="small" /></a></li>
                        <li><a href="#" className="hover:text-blue-200 transition duration-300"><Twitter fontSize="small" /></a></li>
                        <li><a href="#" className="hover:text-blue-200 transition duration-300"><Telegram fontSize="small" /></a></li>
                    </ul>
                </div>
            </div>
            {/* Main header */}
            <div className={`transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-50 bg-blue-800 text-white' : 'bg-white text-blue-900'}`}>
                <div className="container mx-auto px-4 md:px-16 py-2 flex justify-between items-center">
                    <Link to="/" className='flex items-center gap-4 group'>
                        <img src={logo} alt="Lancet Logo" className='w-20 md:w-28 transition-transform duration-300 group-hover:scale-105' />
                        <div className='flex flex-col items-start justify-center'>
                            <h1 className="  text-2xl md:text-3xl font-extrabold font-serif tracking-wide group-hover:text-blue-500 transition-colors duration-300">Lancet</h1>
                            <span className='text-lg md:text-xl font-light tracking-widest uppercase group-hover:text-blue-400 transition-colors duration-300'>Consultancy</span>
                        </div>
                    </Link>


                    <nav className="hidden md:block">
                        <div className="flex space-x-6 text-sm font-serif uppercase font-semibold">
                            <div><a href="/" className={`hover:${isSticky ? 'text-blue-200' : 'text-blue-600'} transition duration-300`}>Home</a></div>
                            <div><a href="/services" className={`hover:${isSticky ? 'text-blue-200' : 'text-blue-600'} transition duration-300`}>Services</a></div>
                            <div><a href="/about" className={`hover:${isSticky ? 'text-blue-200' : 'text-blue-600'} transition duration-300`}>About Us</a></div>
                            <div><a href="/training" className={`hover:${isSticky ? 'text-blue-200' : 'text-blue-600'} transition duration-300`}>Training</a></div>
                            <div><a href="/contact" className={`hover:${isSticky ? 'text-blue-200' : 'text-blue-600'} transition duration-300`}>Contact</a></div>
                        </div>
                    </nav>

                    <div className="flex gap-4 items-center">
                        <div className={`p-2 rounded-full ${isSticky ? 'hover:bg-blue-700' : 'hover:bg-blue-100'} transition duration-300`}>
                            <button className="cursor-pointer" onClick={handleSearch}>
                                {showSearch ? <Close /> : <SearchOutlined fontSize="medium" />}
                            </button>
                        </div>
                        {!currentUser ? (<div className={`p-2 rounded-full ${isSticky ? 'hover:bg-blue-700' : 'hover:bg-blue-100'} transition duration-300`}>
                            <button className="cursor-pointer" onClick={handleAccount}>
                                <PersonOutlined fontSize="medium" />
                            </button>
                        </div>
                        ) : (
                            <div className="group mr-4 lg:mr-10 relative">
                                <img className="rounded-full h-9 w-9 object-cover" src={currentUser.avatar} alt="profile" />
                                <div className="absolute z-[9999] right-3 hidden group-hover:block w-[160px] bg-white p-2 text-black shadow-sm">
                                    <ul className="flex flex-col gap-3 py-2">
                                        <Link to={`/${currentUser.role.toLowerCase()}`} className="hover:bg-slate-200 py-1 px-3">
                                            <h3>My Account</h3>
                                        </Link>
                                        <hr />
                                        <Link to={"/profile"} className="hover:bg-slate-200 py-1 px-3">
                                            <h3>Profile</h3>
                                        </Link>
                                        <hr />
                                        <h2 className="hover:bg-slate-200 py-1 px-3">
                                            <SignOut />
                                        </h2>
                                    </ul>
                                </div>
                            </div>
                        )}

                        <div className="md:hidden">
                            <button onClick={toggleMobileMenu} className="p-2">
                                {showMobileMenu ? <Close /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>

                {showSearch && (
                    <div className="bg-white p-4 shadow-md">
                        <div className="max-w-3xl mx-auto flex">
                            <input
                                type="text"
                                placeholder="I'm looking for"
                                className="flex-grow border p-2 rounded-l-md px-3 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="p-2 text-white bg-blue-800 rounded-r-md hover:bg-blue-700 transition duration-300">
                                <SearchRounded />
                            </button>
                        </div>
                    </div>
                )}

                {showAccount && (
                    <div className="absolute right-4 md:right-20 top-16 z-10 text-black bg-white p-5 font-semibold shadow-lg rounded-md">
                        <a href="/login" className="block hover:text-blue-600 transition duration-300 mb-2">Sign in</a>
                        <a href="/sign-up" className="block hover:text-blue-600 transition duration-300">Register</a>
                    </div>
                )}
            </div>

            {showMobileMenu && (
                <div className="md:hidden bg-blue-800 fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex justify-end p-4">
                        <button onClick={toggleMobileMenu} className="text-white">
                            <Close />
                        </button>
                    </div>
                    <nav className="p-4">
                        <ul className="space-y-4">
                            <li><a href="/" className="block py-3 text-xl text-white hover:bg-blue-700 transition duration-300 rounded-md px-4">Home</a></li>
                            <li><a href="/services" className="block py-3 text-xl text-white hover:bg-blue-700 transition duration-300 rounded-md px-4">Services</a></li>
                            <li><a href="/about" className="block py-3 text-xl text-white hover:bg-blue-700 transition duration-300 rounded-md px-4">About Us</a></li>
                            <li><a href="/training" className="block py-3 text-xl text-white hover:bg-blue-700 transition duration-300 rounded-md px-4">Training</a></li>
                            <li><a href="/contact" className="block py-3 text-xl text-white hover:bg-blue-700 transition duration-300 rounded-md px-4">Contact</a></li>
                        </ul>
                    </nav>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-blue-900">
                        <div className="flex justify-center space-x-6">
                            <a href="#" className="text-white hover:text-blue-200 transition duration-300"><Facebook /></a>
                            <a href="#" className="text-white hover:text-blue-200 transition duration-300"><Instagram /></a>
                            <a href="#" className="text-white hover:text-blue-200 transition duration-300"><Twitter /></a>
                            <a href="#" className="text-white hover:text-blue-200 transition duration-300"><Telegram /></a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;