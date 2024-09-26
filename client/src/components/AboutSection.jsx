import React from "react";
import { Link } from "react-router-dom";
import { FaStethoscope, FaGlobe, FaUserMd } from "react-icons/fa";

const AboutSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center  bg-slate-100 dark:bg-gray-800 p-8 md:p-16">
      <div className="md:w-1/2  md:pt-28 flex justify-center">
        <img
          src="https://plus.unsplash.com/premium_photo-1663047145996-cdb1ef24a17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29uc3VsdGluZ3xlbnwwfHwwfHx8MA%3D%3D" // Replace with your online image URL
          alt="Health"
          className="rounded-lg shadow-lg w-full h-auto"
        />
      </div>
      <div className="md:w-1/2 md:pt-28 mt-8 md:mt-0 md:pl-12 text-center md:text-left">
        <h2 className="text-6xl font-nunito font-bold dark:text-white mb-8">
          About Lancet
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 font-inter text-justify ">
          Established with the vision of supporting regional and national goals
          of ensuring better health for the community by empowering the health
          workforce through a structured Continuing Professional Development
          (CPD) system. Aspiring to enhance the quality of health services
          delivered to the public and contribute to the achievement of universal
          health coverage (UHC) and sustainable development goals (SDG) in
          Ethiopia.
        </p>
        <div className="flex justify-center md:justify-start space-x-4 mb-8">
          <FaStethoscope className="text-blue-600 dark:text-white text-3xl" />
          <FaGlobe className="text-blue-600 dark:text-white text-3xl" />
          <FaUserMd className="text-blue-600 dark:text-white text-3xl" />
        </div>
        <Link to="/about">
          <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-white hover:text-blue-600 border-2 border-blue-600 transition duration-300">
            Explore
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutSection;