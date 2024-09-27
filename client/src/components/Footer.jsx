import React from 'react';
import { Facebook, Twitter, LinkedIn, Instagram, Phone, Email, LocationOn } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <h1 className='text-3xl font-bold font-serif font-heading bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300'>
              Lancet Consultancy
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Empowering professionals through quality consultancy and training services.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6 text-blue-300">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors duration-300 flex items-center"><span className="mr-2">›</span> Home</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors duration-300 flex items-center"><span className="mr-2">›</span> Services</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors duration-300 flex items-center"><span className="mr-2">›</span> About Us</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors duration-300 flex items-center"><span className="mr-2">›</span> Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6 text-blue-300">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="mr-3 text-blue-400" />
                <span>+251935616060 / 0912370018</span>
              </li>
              <li className="flex items-center">
                <Email className="mr-3 text-blue-400" />
                <span>info@lancetconsultancy.com</span>
              </li>
              <li className="flex items-start">
                <LocationOn className="mr-3 text-blue-400 mt-1" />
                <span>Ali Ketema Building, 1st Floor,<br />Dessie, Ethiopia</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-6 text-blue-300">Follow Us</h4>
            <div className="flex flex-col space-y-4">
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <Facebook className="mr-3 group-hover:text-blue-500 transition-colors duration-300" />
                <span>Facebook</span>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <Twitter className="mr-3 group-hover:text-blue-400 transition-colors duration-300" />
                <span>Twitter</span>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <LinkedIn className="mr-3 group-hover:text-blue-700 transition-colors duration-300" />
                <span>LinkedIn</span>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300 flex items-center group">
                <Instagram className="mr-3 group-hover:text-pink-500 transition-colors duration-300" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Lancet Consultancy Services PLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;