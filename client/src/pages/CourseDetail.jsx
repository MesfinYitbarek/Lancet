import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaTag, FaChalkboardTeacher } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/courseDetails/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 md:h-96">
              <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl text-white font-bold text-center">{course.title}</h1>
              </div>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaTag className="mr-2" />
                  <span>{course.catagory}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaChalkboardTeacher className="mr-2" />
                  <span>{course.instructor}</span>
                </div>
              </div>
              <p className="text-xl text-gray-700 mb-8">{course.description}</p>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
                <p className="text-gray-700">{course.description}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc pl-5">
                  {course.requirements.map((item, index) => (
                    <li key={index} className="text-gray-700 mb-2">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Learning Objectives</h2>
                <ul className="list-disc pl-5">
                  {course.learningObjectives.map((item, index) => (
                    <li key={index} className="text-gray-700 mb-2">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Enroll Now
                </button>
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