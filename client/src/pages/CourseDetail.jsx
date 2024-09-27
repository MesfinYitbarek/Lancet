import React from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaTag, FaChalkboardTeacher } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const courses = [
  { id: 1, title: 'Continuous Professional Development (CPD)', category: 'Regular', duration: '40 hours', description: 'Enhance your professional skills with our comprehensive CPD program.', image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlfGVufDB8fDB8fHww', 
    content: 'This course is designed to help professionals stay current with the latest developments in their field. It covers a wide range of topics including leadership skills, communication techniques, and industry-specific knowledge.',
    instructor: 'Dr. Jane Smith',
    syllabus: [
      'Introduction to CPD',
      'Identifying Learning Needs',
      'Developing a CPD Plan',
      'Implementing CPD Activities',
      'Reflecting on Learning',
      'Evaluating CPD Effectiveness'
    ]
  },
  // Add other courses here...
];

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 md:h-96">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
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
                  <span>{course.category}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaChalkboardTeacher className="mr-2" />
                  <span>{course.instructor}</span>
                </div>
              </div>
              <p className="text-xl text-gray-700 mb-8">{course.description}</p>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Course Content</h2>
                <p className="text-gray-700">{course.content}</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
                <ul className="list-disc pl-5">
                  {course.syllabus.map((item, index) => (
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