import React from 'react';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import ExtensionIcon from '@mui/icons-material/Extension';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ViewInArIcon from '@mui/icons-material/ViewInAr';

function WhyChooseUsSection() {
  const reasons = [
    {
      title: "Nationally Accredited",
      description: "Recognized CPD Providing Center",
      icon: SchoolIcon,
      color: "text-red-500",
    },
    {
      title: "Expert Team",
      description: "Experienced and Highly Qualified Professionals",
      icon: GroupIcon,
      color: "text-yellow-500",
    },
    {
      title: "Tailored Solutions",
      description: "Customized Approaches for Your Unique Needs",
      icon: ExtensionIcon,
      color: "text-green-500",
    },
    {
      title: "Innovation Driven",
      description: "Commitment to Excellence and Cutting-edge Practices",
      icon: LightbulbIcon,
      color: "text-blue-500",
    },
    {
      title: "Comprehensive Services",
      description: "Wide Range of Integrated Consultancy Solutions",
      icon: ViewInArIcon,
      color: "text-purple-500",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 transform -skew-y-6  bg-gradient-to-r from-blue-700 to-indigo-500   "></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-nunito pt-10 font-bold text-center mb-20 text-white">
          Why Choose Lancet Consultancy?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:px-10 font-montserrat">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 group"
            >
              <div className={`${reason.color} mb-6 transition-all duration-300 ease-in-out transform group-hover:scale-110`}>
                <reason.icon style={{ fontSize: 48 }} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;