import { useState, useEffect } from 'react';
import { FaSearch, FaGraduationCap, FaChevronLeft, FaChevronRight, FaFilter, FaSort } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { motion } from 'framer-motion';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

import image1 from "../assets/pexels-startup-stock-photos-7075.jpg";

const sortOptions = ['Title Ascending', 'Title Descending', 'Duration Ascending', 'Duration Descending'];

const Training = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Title Ascending');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const coursesPerPage = 6;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category/display");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/courses/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let result = courses;

    if (selectedCategory !== 'All Categories') {
      result = result.filter(course => course.catagory === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'Title Ascending') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'Title Descending') {
        return b.title.localeCompare(a.title);
      } else if (sortBy === 'Duration Ascending') {
        return parseInt(a.duration) - parseInt(b.duration);
      } else if (sortBy === 'Duration Descending') {
        return parseInt(b.duration) - parseInt(a.duration);
      }
      return 0;
    });

    setFilteredCourses(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, courses]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

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

          <div className="relative w-full md:w-auto group">
            <select
              className="w-full md:w-auto appearance-none border rounded-md pl-10 pr-8 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 bg-white cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All Categories">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-blue-500">
              <FaFilter className="h-4 w-4" />
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>

          <div className="relative w-full md:w-auto group">
            <select
              className="w-full md:w-auto appearance-none border rounded-md pl-10 pr-8 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 bg-white cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option} value={option}>Sort by {option}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-blue-500">
              <FaSort className="h-4 w-4" />
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <ClipLoader size={50} color={"#3b82f6"} loading={loading} />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center text-gray-500">No courses found. Try a different search or category.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-20 lg:gap-12 gap-8">
            {currentCourses.map(course => (
              <div key={course._id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col">
                <div className="relative">
                  <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                  <span className="absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
                    {course.catagory}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h2>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">{course.duration}</span>
                    <Link to={`/course/${course._id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center">
                      <FaGraduationCap className="mr-2" />
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCourses.length > coursesPerPage && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="mr-2 p-2 rounded-full bg-gray-100 text-blue-500 hover:bg-blue-100 disabled:opacity-50 transition duration-300"
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: Math.ceil(filteredCourses.length / coursesPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 w-8 h-8 flex items-center justify-center rounded-full ${
                    currentPage === i + 1 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-blue-500 hover:bg-blue-100'
                  } transition duration-300`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === Math.ceil(filteredCourses.length / coursesPerPage)}
                className="ml-2 p-2 rounded-full bg-gray-100 text-blue-500 hover:bg-blue-100 disabled:opacity-50 transition duration-300"
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
