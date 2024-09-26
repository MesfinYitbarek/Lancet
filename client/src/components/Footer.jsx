import React from 'react';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0 flex flex-col gap-5">
            <h1 className='text-3xl font-bold'>Lancet Consultancy</h1>
            <p className="text-lg opacity-80">
              Empowering professionals through quality consultancy and training services.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="text-lg font-mono">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 font-mono mb-6 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
            <p className="text-lg mb-2">Phone: <span className="font-semibold">+251935616060</span> / <span className="font-semibold">0912370018</span></p>
            <p className="text-lg mb-2">Email: <span className="font-semibold">info@lancetconsultancy.com</span></p>
            <p className="text-lg">Address: <span className="font-semibold">Ali Ketema Building, 1st Floor, Dessie, Ethiopia</span></p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex flex-col space-x-4 text-lg">
              <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <Facebook fontSize="medium" />
                <span className="ml-2">Facebook</span>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <Twitter fontSize="medium" />
                <span className="ml-2">Twitter</span>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <LinkedIn fontSize="medium" />
                <span className="ml-2">LinkedIn</span>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                <Instagram fontSize="medium" />
                <span className="ml-2">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm opacity-70">
          <p>&copy; 2024 Lancet Consultancy Services PLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;