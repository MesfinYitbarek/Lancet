import React from 'react';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function HeroSection() {
    return (
        <div className="relative h-screen overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1576089235406-0612d7bb033e?w=1600&auto=format&fit=crop&q=80')",
                    filter: 'brightness(0.7)'
                }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-900/70"></div>

            <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in-down">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
                            Empowering
                        </span> Excellence through<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                            Training
                        </span> and
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-300">
                            Consulting
                        </span>
                    </h1>

                    <p className="mt-3 max-w-md mx-auto text-xl text-gray-200 sm:text-2xl md:mt-5 md:max-w-3xl animate-fade-in-up">
                        Elevate your professional journey with our nationally accredited CPD programs and expert consultancy services.
                    </p>

                    <div className="my-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                        <Link
                            to={"/services"}
                            className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-full text-blue-900 bg-gray-100 hover:bg-gray-200 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                        >
                            Our Services
                        </Link>
                        <Link
                            to={"/contact"}

                            className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                        >
                            Contact Us <ArrowForward className="ml-2 inline-block" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#f3f4f6" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,170.7C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </div>
    );
}

export default HeroSection;