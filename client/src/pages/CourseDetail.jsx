import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaTag, FaChalkboardTeacher, FaDollarSign, FaStar, FaUserGraduate, FaChevronDown, FaChevronUp, FaBook, FaCheckCircle, FaBullseye } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      className="flex justify-between items-center w-full py-4 px-6 text-left transition-colors duration-300 hover:bg-gray-50"
      onClick={onClick}
    >
      <span className="font-semibold text-gray-800">{title}</span>
      {isOpen ? <FaChevronUp className="text-blue-500" /> : <FaChevronDown className="text-gray-400" />}
    </button>
    {isOpen && (
      <div className="p-6 bg-gray-50">
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
    )}
  </div>
);

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/courseDetails/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to load course data');
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (loading) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  if (error) return <div className="text-center text-red-500 text-xl mt-10">{error}</div>;
  if (!course) return <div className="text-center text-gray-500 text-xl mt-10">No course data available</div>;

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="relative h-80 md:h-96">
              <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-70 flex items-end justify-start p-8">
                <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight">{course.title}</h1>
              </div>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
                {course.duration && (
                  <div className="flex items-center text-gray-700">
                    <FaClock className="mr-2 text-blue-500" />
                    <span>{course.duration}</span>
                  </div>
                )}
                {course.catagory && (
                  <div className="flex items-center text-gray-700">
                    <FaTag className="mr-2 text-blue-500" />
                    <span>{course.catagory}</span>
                  </div>
                )}
                {course.instructor && (
                  <div className="flex items-center text-gray-700">
                    <FaChalkboardTeacher className="mr-2 text-blue-500" />
                    <span>{course.instructor}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-700">
                  <FaDollarSign className="mr-2 text-blue-500" />
                  <span>{course.isPaid ? `$${course.price}` : 'Free'}</span>
                </div>
                {course.rating && (
                  <div className="flex items-center text-gray-700">
                    <FaStar className="mr-2 text-yellow-500" />
                    <span>{course.rating} ({course.reviewCount} reviews)</span>
                  </div>
                )}
                {course.level && (
                  <div className="flex items-center text-gray-700">
                    <FaUserGraduate className="mr-2 text-blue-500" />
                    <span>{course.level}</span>
                  </div>
                )}
              </div>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed">{course.description}</p>
              
              {course.curriculum && course.curriculum.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <FaBook className="mr-3 text-blue-500" />
                    Course Content
                  </h2>
                  <div className="border rounded-lg overflow-hidden shadow-md">
                    {course.curriculum.map((item, index) => (
                      <AccordionItem
                        key={index}
                        title={item.title}
                        content={item.content}
                        isOpen={openSections[index]}
                        onClick={() => toggleSection(index)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {course.requirements && course.requirements.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <FaCheckCircle className="mr-3 text-blue-500" />
                    Requirements
                  </h2>
                  <ul className="list-none pl-5 space-y-3">
                    {course.requirements.map((item, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="text-blue-500 mr-3">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {course.learningObjectives && course.learningObjectives.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <FaBullseye className="mr-3 text-blue-500" />
                    Learning Objectives
                  </h2>
                  <ul className="list-none pl-5 space-y-3">
                    {course.learningObjectives.map((item, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="text-blue-500 mr-3">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {course.review && course.review !== "no data" && (
                <div className="mb-12">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <FaStar className="mr-3 text-yellow-500" />
                    Review
                  </h2>
                  <p className="text-gray-700 bg-gray-50 p-6 rounded-lg italic">{course.review}</p>
                </div>
              )}
              <div className="mt-12 flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded-lg">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 mb-4 md:mb-0 w-full md:w-auto">
                  Enroll Now
                </button>
                <div className="text-gray-600 text-center md:text-right">
                  <p>Created: {new Date(course.createdAt).toLocaleDateString()}</p>
                  <p>Last Updated: {new Date(course.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;