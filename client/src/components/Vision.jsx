import React from 'react';
import { Flag, Scale } from '@mui/icons-material';
import { FaEye } from 'react-icons/fa';

const Vision = () => {
  const sections = [
    {
      title: 'Our Vision',
      content: 'To be one of the five leading national centers of excellence in consultancy firms in Africa, providing quality, innovative, community-driven consultancy, training, and research services by 2030.',
      icon: FaEye,
      color: 'from-blue-500 to-blue-700',
    },
    {
      title: 'Our Mission',
      content: 'To leverage the health and business sectors through quality training, consultancy, and research services. We focus on capacity building of professionals and expanding the frontiers of knowledge for economic development.',
      icon: Flag,
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Our Principles',
      content: ['Need-based approach', 'Access and equity', 'Innovation', 'Quality-driven services'],
      icon: Scale,
      color: 'from-blue-300 to-blue-500',
    },
  ];

  return (
    <section className="min-h-screen bg-slate-100 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-lg shadow-lg ${
                index % 2 === 0 ? 'md:mt-16' : 'md:mt-0'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-90`}></div>
              <div className="relative p-8">
                <section.icon className="h-12 w-12 text-white mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4 font-nunito">{section.title}</h3>
                {Array.isArray(section.content) ? (
                  <ul className="text-white space-y-2 font-inter">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white font-inter">{section.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vision;