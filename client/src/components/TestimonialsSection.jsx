import React, { useState } from 'react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

function TestimonialsSection() {
  const testimonials = [
    {
      name: "John Doe",
      position: "CEO, Healthcare Corp",
      content: "Lancet Consultancy's CPD programs have significantly improved our staff's performance and knowledge base."
    },
    {
      name: "Jane Smith",
      position: "Director, Public Health Institute",
      content: "Their research and consultancy services are top-notch. Highly recommended for any healthcare organization."
    },
    {
      name: "Alice Johnson",
      position: "Head of Nursing, City Hospital",
      content: "The training programs provided by Lancet have revolutionized our nursing practices. Exceptional quality!"
    },
    {
      name: "Robert Brown",
      position: "Health Policy Advisor",
      content: "Lancet's insights have been invaluable in shaping our healthcare policies. Their expertise is unmatched."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-nunito pt-10 font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="relative">
          <div className="flex justify-between items-center font-lato text-xl px-10 gap-8">
            {testimonials.slice(currentIndex, currentIndex + 2).map((testimonial, index) => (
              <div key={index} className="bg-white p-14 border-b-4 border-b-blue-600 rounded-lg shadow-md flex-1">
                <p className="text-gray-700 mb-10">{testimonial.content}</p>
                <p className="font-semibold text-blue-600">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full"
          >
            <ArrowBackIos />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full"
          >
            <ArrowForwardIos />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;