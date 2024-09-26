import React from 'react';
import { ArrowForward, CheckCircle, Star } from '@mui/icons-material';
import HeroSection from '../components/HeroSection';
import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import ServicesSectionHome from '../components/ServicesSectionHome';
import Vision from '../components/Vision';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';
import TestimonialsSection from '../components/TestimonialsSection';













function Home() {
  return (
    <div  className=' bg-gradient-to-r from-gray-50 to-gray-100 ' >
      <Header   />
      <HeroSection />
      <AboutSection/>
      <Vision/>
      <ServicesSectionHome/>
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CallToAction/>
      <Footer />
    </div>
  );
}

export default Home;