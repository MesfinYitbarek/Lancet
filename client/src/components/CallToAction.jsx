import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';
import imag from "../assets/pexels-minan1398-683402.jpg"
const CallToAction = () => {
  return (
    <section className="relative py-28">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${imag})`,
          filter: 'brightness(0.4)'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-nunito">
          Ready to enhance your professional journey?
        </h2>
        <p className="text-xl text-white mb-8 font-inter">
          Join Lancet Consultancy Services and take the next step in your career development.
        </p>
        <Link to="/register" className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 font-inter">
          Get Started
          <ArrowForward className="ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;