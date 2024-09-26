import React, { useState } from 'react';
import {
    Close, Email, Facebook, Instagram,
    PersonOutlined, Phone, SearchOutlined, SearchRounded, Telegram, Twitter, Menu as MenuIcon
} from '@mui/icons-material';
import logo from "../assets/Lancet_CPD_Center-1.jpg";

function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const [showAccount, setShowAccount] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleSearch = () => setShowSearch(!showSearch);
    const handleAccount = () => setShowAccount(!showAccount);
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

    return (
        <header className="bg-white  shadow-md font-lato">
            <div className="flex justify-between items-center px-4 md:px-10 bg-gradient-to-r from-blue-800 to-blue-600 text-white py-2">
                <div className="hidden md:flex text-sm justify-center items-center gap-4 md:gap-10">
                    <h3 className="flex items-center"><Phone fontSize="small" className="mr-2" />+251935616060 / 0912370018</h3>
                    <h3 className="flex items-center"><Email fontSize="small" className="mr-2" />info@lancetconsultancy.com</h3>
                </div>
                <ul className="flex justify-between items-center gap-6">
                    <li><a href="" className="hover:text-blue-200 transition duration-300"><Facebook fontSize="small" /></a></li>
                    <li><a href="" className="hover:text-blue-200 transition duration-300"><Instagram fontSize="small" /></a></li>
                    <li><a href="" className="hover:text-blue-200 transition duration-300"><Twitter fontSize="small" /></a></li>
                    <li><a href="" className="hover:text-blue-200 transition duration-300"><Telegram fontSize="small" /></a></li>
                </ul>
            </div>

            <div className="container  mx-auto px-4 md:px-16 py-4 flex justify-between items-center">
                <div className='flex items-center gap-2'>
                    <img src={logo} alt="Lancet Logo" className='w-28 md:w-36' />
                    <div className=' flex text-blue-900 italic  items-center justify-center '>
                    <h1 className=" text-lg  font-extrabold md:text-3xl     w-[50%]">Lancet </h1>
                    <span className='text-xl font-extrabold md:text-3xl  text-center ml-4'>Consultancy</span> 
                    </div>
                </div>

                <nav className="hidden md:block">
                    <div className="flex space-x-6  text-sm  font-lato  uppercase text-blue-900 font-semibold">
                        <div><a href="/" className="hover:text-blue-600 transition duration-300">Home</a></div>
                        <div><a href="/services" className="hover:text-blue-600 transition duration-300">Services</a></div>
                        <div><a href="/about" className="hover:text-blue-600 transition duration-300">About Us</a></div>
                        <div><a href="/training" className="hover:text-blue-600 transition duration-300">Training</a></div>
                        <div><a href="/contact" className="hover:text-blue-600 transition duration-300">Contact</a></div>
                    </div>
                </nav>

                <div className="flex gap-4 items-center">
                    <div className="p-2 rounded-full hover:bg-blue-100 transition duration-300">
                        <button className="cursor-pointer text-blue-900" onClick={handleSearch}>
                            {showSearch ? <Close /> : <SearchOutlined fontSize="medium" />}
                        </button>
                    </div>
                    <div className="p-2 rounded-full hover:bg-blue-100 transition duration-300">
                        <button className="cursor-pointer text-blue-900" onClick={handleAccount}>
                            <PersonOutlined fontSize="medium" />
                        </button>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu} className="p-2 text-blue-900">
                            {showMobileMenu ? <Close /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </div>

            {showSearch && (
                <div className=" left-0 right-0 bg-white p-4 shadow-md">
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
                <div className="absolute right-4 md:right-20 top-40 z-10 text-black bg-white p-5 font-semibold shadow-lg rounded-md">
                    <a href="/login" className="block hover:text-blue-600 transition duration-300 mb-2">Sign in</a>
                    <a href="/register" className="block hover:text-blue-600 transition duration-300">Register</a>
                </div>
            )}

            {showMobileMenu && (
                <div className="md:hidden bg-white p-4 shadow-md">
                    <nav>
                        <ul className="space-y-3">
                            <li><a href="/" className="block py-2 hover:text-blue-600 transition duration-300">Home</a></li>
                            <li><a href="#services" className="block py-2 hover:text-blue-600 transition duration-300">Services</a></li>
                            <li><a href="#about" className="block py-2 hover:text-blue-600 transition duration-300">About Us</a></li>
                            <li><a href="#training" className="block py-2 hover:text-blue-600 transition duration-300">Training</a></li>
                            <li><a href="/contact" className="block py-2 hover:text-blue-600 transition duration-300">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;