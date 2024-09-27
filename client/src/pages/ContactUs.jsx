import React, { useState } from 'react'
import { motion } from 'framer-motion';
import image1 from "../assets/pexels-startup-stock-photos-7075.jpg"
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Close, Email, LocationOn, Phone } from '@mui/icons-material';
import { Alert, Box, Collapse, IconButton } from '@mui/material';
const ContactUs = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [open, setOpen] = useState(true);

    const contactData = [
        {
          title: "Address",
          content: "Ali Ketema Building, 1st Floor, Dessie, Ethiopia",
          icon: <LocationOn />,
          delay: 0.1,
        },
        {
          title: "Phone",
          content: "+251935616060 / 0912370018",
          icon: <Phone />,
          delay: 0.3,
        },
        {
          title: "Email",
          content: "info@lancetconsultancy.com",
          icon: <Email />,
          delay: 0.5,
        },
      ];

  return (
    <div>
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
          <h1 className="text-6xl font-nunito font-bold mb-6">Contact Us</h1>
        </div>
      </motion.div>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-5xl font-nunito font-bold text-blue-800 dark:text-white mb-4">Get in Touch</h2>
          <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-600 dark:text-gray-300 text-justify">
          We’re thrilled that you’re reaching out to us. Your feedback, questions, and inquiries are of great importance to us. You can either use the provided contact information to get in touch with our team or simply fill out the form below. We look forward to speaking with you and are excited to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 lg:px-12">
          {contactData.map((data, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              className="group dark:bg-sky-900 flex flex-col items-center dark:text-white text-sky-800 gap-4 md:gap-6 pt-6 md:pt-8 shadow-xl rounded-sm hover:text-white hover:scale-105 hover:bg-gradient-to-r from-blue-500 to-blue-700 p-4 md:p-6 text-center h-[200px] md:h-[220px] bg-white"
            >
              <div className="border-2 dark:text-white text-blue-800 group-hover:border-white group-hover:text-white border-blue-800 p-2 h-[45px] w-[45px] rounded-full flex items-center justify-center">
                {data.icon}
              </div>
              <div className="font-semibold">
                <h3 className="font-bold text-lg pb-2">{data.title}</h3>
                <p className="text-sm md:text-base">{data.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="dark:bg-gray-700 flex justify-center rounded-lg p-4 md:p-10"
        >
          <form
            data-aos="fade-up"
            data-aos-once="true"

            className="flex flex-col dark:text-white dark:bg-gray-500 space-y-4 w-full max-w-[650px] bg-white shadow-md p-6 md:p-10 rounded-xl border-slate-400"
          >
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                id="name"
                name="name"


                className="px-4 py-2 border-b dark:bg-gray-500 dark:text-white border-slate-400 focus:border-b-2 focus:border-b-sky-600 focus:outline-none w-full dark:placeholder:text-white focus:placeholder:text-sky-600"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                id="email"
                name="email"

                className="px-4 py-2 dark:bg-gray-500 dark:text-white border-slate-400 border-b dark:placeholder:text-white focus:border-b-2 focus:border-b-sky-600 focus:outline-none w-full focus:placeholder:text-sky-600"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <textarea
                id="message"
                name="message"

                className="px-4 py-2 dark:bg-gray-500 dark:text-white border border-slate-400 dark:placeholder:text-white resize-none h-[170px] focus:outline-sky-600 w-full focus:placeholder:text-sky-600"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-800 hover:bg-white hover:text-blue-800 hover:border hover:border-blue-800 font-semibold text-white px-4 py-3 rounded-sm focus:outline-none w-full md:w-[30%] mx-auto"
            >
              Send Message
            </button>
            {formSubmitted && (
              <Box sx={{ width: "100%" }}>
                <Collapse in={open}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        <Close fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Message submitted successfully!
                  </Alert>
                </Collapse>
              </Box>
            )}
          </form>
        </motion.div>
      </div>
      <Footer/>
    </div>
  )
}

export default ContactUs
