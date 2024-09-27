import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { School, Business, Assessment, GroupWork, Timeline, Tune, CheckCircleOutline } from '@mui/icons-material';
import image1 from "../assets/pexels-startup-stock-photos-7075.jpg";
import image2 from "../assets/pexels-davdkuko-20336005.jpg";
import image3 from "../assets/pexels-ketut-subiyanto-4584095.jpg";
import image4 from "../assets/pexels-norman-milwood-236004651-28556245.jpg";

const ServiceCard = ({ title, items, icon }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
  >
    <div className="flex items-center mb-6">
      {icon}
      <h3 className="text-2xl font-bold ml-4 text-blue-800">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <CheckCircleOutline className="text-green-500 mr-2 mt-1 flex-shrink-0" />
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const Services = () => {
  const trainingServices = [
    {
      title: "Regular Training Programs",
      items: [
        "Continuous Professional Development (CPD)",
        "Research Methods and Grant Proposal Writing",
        "Statistical Software (R, Python, MaxQDA, SPSS, Stata, Peachtree)",
        "Public Health and Health-related Studies",
      ],
      icon: <School className="text-5xl text-blue-600" />
    },
    {
      title: "Tailor-made Training Programs",
      items: [
        "Kobo Mobile Data Collection, ODK",
        "Community engagement and accountability",
        "Procurement and Supply Chain Management",
        "GAT, GMAT preparation",
        "Licensure and Exit Exam preparation",
        "Article Review and Critical Appraisal",
        "Systematic Review and Meta-analysis",
        "Manuscript Writing and Publications",
        "Digital and Virtual Tutoring for Ethiopian Students in Europe and America",
      ],
      icon: <Tune className="text-5xl text-blue-600" />
    }
  ];

  const consultancyServices = [
    {
      title: "Research Services",
      items: [
        "Baseline surveys, process evaluations, and impact assessments",
        "Cost Effectiveness studies",
        "Environmental and Social Impact Assessments",
        "Feasibility Studies, Market and Value-chain Analysis",
        "Youth, Gender, Children and Key Population-related studies",
      ],
      icon: <Assessment className="text-5xl text-blue-600" />
    },
    {
      title: "Consultancy Services",
      items: [
        "System development for humanitarian services",
        "Process consulting for humanitarian services",
        "Project Planning and Management",
        "Pharmacy Establishments consulting",
        "Pharmaceuticals Registration & Market Authorization",
        "Health Supply Chain and related National Initiatives",
        "Exit and Licensure Exams consulting",
        "Graduate Aptitude Test (GAT) consulting",
      ],
      icon: <Business className="text-5xl text-blue-600" />
    }
  ];

  return (
    <>
      <Header/>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-cover bg-center py-24 text-white"
        style={{ backgroundImage: `url(${image1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-70"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-nunito font-bold mb-6">Our Services</h1>
        </div>
      </motion.div>

      <section className="py-20 font-lato bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-nunito font-bold text-center mb-12 text-blue-800">Training Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {trainingServices.map((service, index) => (
              <ServiceCard key={index} title={service.title} items={service.items} icon={service.icon} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-nunito font-bold text-center mb-12 text-blue-800">Research & Consultancy Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {consultancyServices.map((service, index) => (
              <ServiceCard key={index} title={service.title} items={service.items} icon={service.icon} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-600 font-lato text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-nunito font-bold mb-12">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white text-blue-800 p-8 rounded-lg shadow-md"
            >
              <GroupWork className="text-5xl mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Tailored Solutions</h3>
              <p>Customized programs to meet your specific needs and requirements</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white text-blue-800 p-8 rounded-lg shadow-md"
            >
              <Timeline className="text-5xl mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Flexible Delivery</h3>
              <p>Choose from full boarding, non-boarding, or training-only options</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white text-blue-800 p-8 rounded-lg shadow-md"
            >
              <School className="text-5xl mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p>Learn from experienced professionals in various fields</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 font-lato bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-800">Ready to Elevate Your Professional Growth?</h2>
          <p className="text-xl text-gray-700 mb-8">Contact us today to discuss how we can tailor our services to meet your unique needs.</p>
          <motion.a 
            href="/contact" 
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition duration-300 inline-flex items-center"
          >
            Get in Touch
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </div>
      </section>
      <Footer/>
    </>
  );
};
export default Services;