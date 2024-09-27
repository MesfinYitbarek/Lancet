import React, { useState, useEffect } from 'react';
import { FaSearch, FaGraduationCap, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { motion } from 'framer-motion';

import image1 from "../assets/pexels-startup-stock-photos-7075.jpg"

const courses = [
  { id: 1, title: 'Continuous Professional Development (CPD)', category: 'Regular', duration: '40 hours', description: 'Enhance your professional skills with our comprehensive CPD program.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww' },
  { id: 2, title: 'Research Methods', category: 'Regular', duration: '30 hours', description: 'Learn advanced research methodologies and techniques.', image: 'https://images.unsplash.com/file-1705123271268-c3eaf6a79b21image?w=416&dpr=2&auto=format&fit=crop&q=60' },
  { id: 3, title: 'Grant Proposal Writing', category: 'Regular', duration: '20 hours', description: 'Master the art of writing compelling grant proposals.', image: 'https://plus.unsplash.com/premium_photo-1682787494977-d013bb5a8773?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y291cnNlfGVufDB8fDB8fHww' },
  { id: 4, title: 'Statistical Software (R)', category: 'Regular', duration: '25 hours', description: 'Gain proficiency in R for statistical analysis and data visualization.', image: 'https://images.unsplash.com/photo-1557804483-ef3ae78eca57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y291cnNlfGVufDB8fDB8fHww' },
  { id: 5, title: 'Kobo Mobile Data Collection', category: 'Tailor-made', duration: '15 hours', description: 'Learn to collect and manage data efficiently using Kobo Toolbox.', image: 'https://source.unsplash.com/random/800x600?mobile' },
  { id: 6, title: 'Community Engagement', category: 'Tailor-made', duration: '10 hours', description: 'Develop strategies for effective community engagement and outreach.', image: 'https://plus.unsplash.com/premium_photo-1681248156500-8f209e8e466e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y291cnNlfGVufDB8fDB8fHww' },
  { id: 7, title: 'Procurement and Supply Chain Management', category: 'Tailor-made', duration: '35 hours', description: 'Master the principles of efficient procurement and supply chain management.', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y291cnNlfGVufDB8fDB8fHww' },
  { id: 8, title: 'Preparation for Licensure Exam', category: 'Tailor-made', duration: '50 hours', description: 'Comprehensive preparation for your professional licensure examination.', image: 'https://plus.unsplash.com/premium_photo-1682284352941-58dceb6cd601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y291cnNlfGVufDB8fDB8fHww' },
];

const categories = ['All Categories', 'Regular', 'Tailor-made'];
const sortOptions = ['Title', 'Duration'];

const Training = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Title');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  useEffect(() => {
    let result = courses;

    if (selectedCategory !== 'All Categories') {
      result = result.filter(course => course.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'Title') {
        return a.title.localeCompare(b.title);
      } else {
        return parseInt(a.duration) - parseInt(b.duration);
      }
    });

    setFilteredCourses(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <h1 className="text-4xl md:text-6xl font-nunito font-bold mb-6">Discover Our Training Courses</h1>
        </div>
      </motion.div>
      <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
        <div className="mb-10 flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full md:w-64 pl-12 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-0 top-0 h-full flex items-center justify-center px-3 bg-blue-500 rounded-l-md">
              <FaSearch className="text-white" />
            </div>
          </div>

          <div className="relative w-full md:w-auto">
            <select
              className="w-full md:w-auto appearance-none border rounded-md px-4 py-2 pr-8 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>

          <div className="relative w-full md:w-auto">
            <select
              className="w-full md:w-auto appearance-none border rounded-md px-4 py-2 pr-8 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>Sort by {option}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-20 lg:gap-12 gap-8">
          {currentCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col">
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <span className="absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
                  {course.category}
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">{course.duration}</span>
                  <Link to={`/course/${course.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center">
                    <FaGraduationCap className="mr-2" />
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <p className="text-center text-gray-500 mt-8 text-xl">No courses found.</p>
        )}

        {/* Pagination */}
        {filteredCourses.length > coursesPerPage && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="mr-2 px-4 py-2 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-4 py-2 border rounded-md ${
                    currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === Math.ceil(filteredCourses.length / coursesPerPage)}
                className="ml-2 px-4 py-2 border rounded-md bg-white text-blue-500 hover:bg-blue-100 disabled:opacity-50"
              >
                <FaChevronRight />
              </button>
            </nav>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Training;