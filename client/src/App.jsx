import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Services from './pages/Services';
import Training from './pages/Trainig';
import CourseDetail from './pages/CourseDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/training" element={<Training />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;