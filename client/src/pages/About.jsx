import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import image1 from "../assets/pexels-startup-stock-photos-7075.jpg"
import image2 from "../assets/pexels-davdkuko-20336005.jpg"
import image3 from "../assets/pexels-ketut-subiyanto-4584095.jpg"
import image4 from "../assets/pexels-norman-milwood-236004651-28556245.jpg"
const About = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'CEO', image: `${image2}`, social: { linkedin: '#', twitter: '#', facebook: '#' } },
    { name: 'Jane Smith', role: 'COO', image: `${image3}`, social: { linkedin: '#', twitter: '#', facebook: '#' } },
    { name: 'Mike Johnson', role: 'CTO', image: `${image4}`, social: { linkedin: '#', twitter: '#', facebook: '#' } },
    { name: 'John Doe', role: 'CEO', image: `${image2}`, social: { linkedin: '#', twitter: '#', facebook: '#' } },
    { name: 'Jane Smith', role: 'COO', image: `${image3}`, social: { linkedin: '#', twitter: '#', facebook: '#' } },
    { name: 'Mike Johnson', role: 'CTO', image: `${image4}`, social: { linkedin: '#', twitter: '#', facebook: '#' } },
  ];

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-cover bg-center py-24 text-white"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-70"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-nunito font-bold mb-6">About Us</h1>
        </div>
      </motion.div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12 px-20">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl  font-nunito  font-bold mb-6">Our Mission</h2>

              <p className="text-lg font-lato text-justify text-gray-700 mb-4">
              Lancet Consultancy Service PLC is missioned to leverage the health and business sectors of the country through offering quality services of training, consultancy and research focusing on provision of quality training, research and consultancy services to the sector and capacity building/development of professionals working in various health and business sectors.  To expand the frontiers of knowledge; enhance creativity & innovation, and produce competent trainees for the advancement of productivity and economic development. 
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-4xl font-nunito  font-bold mb-6">Our Vision</h2>
              <p className="text-lg font-lato text-justify text-gray-700">
              Lancet Consultancy Service PLC aspire to be one of the five leading and national center of excellence consultancy firms in Africa in providing quality, innovative, community-driven consultancy, training and research services in 2030. 
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-nunito  font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "Ethics & Professionalism", icon: "fas fa-handshake" },
              { value: "Humanitarianism", icon: "fas fa-heart" },
              { value: "Service Quality", icon: "fas fa-award" },
              { value: "Community Focus", icon: "fas fa-users" },
              { value: "Creativity & Innovation", icon: "fas fa-lightbulb" },
              { value: "Inclusiveness", icon: "fas fa-universal-access" },
              { value: "Transparency", icon: "fas fa-lock-open" },
              { value: "Continuous Learning", icon: "fas fa-graduation-cap" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform transform hover:scale-110">
                  <i className={`${item.icon} text-2xl`}></i>
                </div>
                <p className="font-semibold font-lato ">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:px-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-nunito font-bold text-center mb-12 ">Our Objectives</h2>
          <div className="grid grid-cols-1 font-lato md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "fas fa-bullseye", objective: "Provide need-driven trainings and consultancy services" },
              { icon: "fas fa-search", objective: "Offer research-led diversified consultancy services" },
              { icon: "fas fa-graduation-cap", objective: "Prepare trainees with necessary knowledge and skills" },
              { icon: "fas fa-globe", objective: "Consult on local, national, and international issues" },
              { icon: "fas fa-handshake", objective: "Create national and international links" },
              { icon: "fas fa-chart-line", objective: "Leverage professionals for evidence-based practices" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-blue-600 mr-4">
                  <i className={`${item.icon} text-3xl`}></i>
                </div>
                <p className="text-lg text-gray-700">{item.objective}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:px-16">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-nunito font-bold text-center mb-12 ">Our Guiding Principles</h2>
          <div className="grid grid-cols-1 font-lato md:grid-cols-2 gap-8">
            {[
              { title: "Need-based", description: "Empirical assessment of health workforce needs", icon: "fas fa-chart-bar" },
              { title: "Access and Equity", description: "Fair opportunity for all health workers", icon: "fas fa-balance-scale" },
              { title: "Innovative", description: "Use of technology and new methods", icon: "fas fa-lightbulb" },
              { title: "Quality", description: "Standardized activities meeting national requirements", icon: "fas fa-award" },
            ].map((principle, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:border-blue-500 hover:border-2 flex items-start"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-blue-600 mr-4 mt-1">
                  <i className={`${principle.icon} text-3xl`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-600 hover:underline">{principle.title}</h3>
                  <p className="text-gray-700">{principle.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-nunito font-bold text-center mb-12 ">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 px-10 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={member.social.linkedin} className="text-blue-600 hover:text-blue-800"><i className="fab fa-linkedin fa-lg"></i></a>
                    <a href={member.social.twitter} className="text-blue-400 hover:text-blue-600"><i className="fab fa-twitter fa-lg"></i></a>
                    <a href={member.social.facebook} className="text-blue-800 hover:text-blue-950"><i className="fab fa-facebook fa-lg"></i></a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;