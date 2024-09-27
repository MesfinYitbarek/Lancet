import React from "react";
import { Link } from "react-router-dom";
import { FaStethoscope, FaGlobe, FaUserMd } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-slate-100 dark:bg-gray-800 p-4 sm:p-8 lg:p-16">
      <div className="w-full lg:w-1/2 flex justify-center relative mb-20 lg:mb-0">
        <img
          src="https://plus.unsplash.com/premium_photo-1663047145996-cdb1ef24a17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29uc3VsdGluZ3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Health"
          className="rounded-lg shadow-lg w-full max-w-md h-auto z-10"
        />
        <motion.img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvdXJzZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="Doctor"
          className="rounded-lg shadow-lg w-3/5 max-w-sm h-auto absolute -bottom-10 right-0 sm:-right-5 lg:right-0 lg:translate-x-1/4 lg:translate-y-1/4 z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-12 text-center lg:text-left">
        <motion.h2 
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Lancet
        </motion.h2>
        <motion.p 
          className="text-base sm:text-lg font-serif text-gray-700 dark:text-gray-300 mb-6 text-justify"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Established with the vision of supporting regional and national goals
          of ensuring better health for the community by empowering the health
          workforce through a structured Continuing Professional Development
          (CPD) system. Aspiring to enhance the quality of health services
          delivered to the public and contribute to the achievement of universal
          health coverage (UHC) and sustainable development goals (SDG) in
          Ethiopia.
        </motion.p>
        <motion.div 
          className="flex justify-center lg:justify-start space-x-4 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaStethoscope className="text-blue-600 dark:text-white text-2xl sm:text-3xl" />
          <FaGlobe className="text-blue-600 dark:text-white text-2xl sm:text-3xl" />
          <FaUserMd className="text-blue-600 dark:text-white text-2xl sm:text-3xl" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/about">
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-md hover:bg-white hover:text-blue-600 border-2 border-blue-600 transition duration-300 text-sm sm:text-base">
              Explore
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;