import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const ServicesSection = () => {
  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      controls.start({
        x: x * 30,
        y: y * 30,
        transition: { type: 'spring', damping: 50, stiffness: 200 }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [controls]);

  const services = [
    {
      title: "Professional Training",
      icon: "M19 14l-7 7m0 0l-7-7m7 7V3",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Comprehensive regular and tailor-made training programs covering a wide range of health-related topics, from CPD to advanced statistical software.",
    },
    {
      title: "Research Services",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Expert-led research services including strategic planning, impact assessments, feasibility studies, and specialized health sector research.",
    },
    {
      title: "Consultancy",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Specialized consultancy services for healthcare organizations, covering system development, process consulting, and pharmaceutical advisory.",
    }
  ];

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4  relative z-10">
        <h2 className="text-4xl md:text-5xl font-nunito font-bold text-center  mb-32 ">Our Services</h2>
        
        <div className="relative mb-16">
          <motion.div 
            className="absolute inset-x-0 -top-28 flex items-center justify-center pointer-events-none"
            animate={controls}
          >
            <h2 className="text-[15vw] font-bold text-gray-400 opacity-20 select-none font-serif leading-none">Services</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:px-8 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition duration-300 transform hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-600 rounded-full mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon}></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-grow">
                <p className="text-gray-600 mb-6">{service.description}</p>
              </div>
              <Link 
                to="/services" 
                className="block w-full py-4 bg-blue-600 text-white font-semibold text-center transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Read More
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;