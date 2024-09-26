import React from 'react';
import Slider from 'react-slick';
import { ArrowForward } from '@mui/icons-material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroSection() {
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const carouselItems = [
        {
            image: "https://images.unsplash.com/photo-1576089235406-0612d7bb033e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uc3VsdGluZ3xlbnwwfHwwfHx8MA%3D%3D",
            text: "Empowering health professionals through quality CPD programs"
        },
        {
            image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            text: "Nationally accredited center for continuing education"
        },
        {
            image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80",
            text: "Enhancing healthcare delivery through expert consultancy"
        },
    ];

    return (
        <div className="relative h-screen bg-gradient-to-r from-blue-800 to-blue-600 text-white ">
            <Slider {...carouselSettings} className="h-full">
                {carouselItems.map((item, index) => (
                    <div key={index} className="h-screen">
                        <div
                            className="h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.image})` }}
                        >
                            <div className="absolute bottom-20 left-10 bg-blue-800 bg-opacity-75 text-white p-4 rounded-lg">
                                <p className="text-lg font-semibold">{item.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="container mx-auto px-4 flex items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center justify-center">
                        <div className=" text-center items-center flex-col flex text-white">
                            <h1 className="text-4xl md:text-5xl  mb-4  ">
                               <span className='font-bold'> Empowering</span> Excellence through <span className='font-bold'>Training</span>  and <span className='font-bold'>Consulting</span> 
                            </h1>
                           
                            <div className="flex flex-col mt-10 sm:flex-row gap-4">
                                <a
                                    href="#services"
                                    className="bg-white text-blue-800 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300 text-center"
                                >
                                    Our Services
                                </a>
                                <a
                                    href="#contact"
                                    className="bg-transparent border-2 border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-blue-800 transition duration-300 text-center flex items-center justify-center"
                                >
                                    Contact Us <ArrowForward className="ml-2" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;