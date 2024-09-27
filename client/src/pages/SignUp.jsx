import React from 'react'
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const SignUp = () => {
    return (
        <div className=" bg-slate-50">
          <Header />

    
          <div className="  flex justify-center items-center">
            <div className="dark:bg-gray-400 p-[5%] rounded-2xl sm:w-[650px] bg-white shadow-xl  border-slate-300 m-[5%]">
              <h1 className="mb-3 font-serif sm:text-[28px] text-blue-600 text-center">Create an Account</h1>
              <form  className="flex flex-col justify-between items-center gap-6">
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  required

                  className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  required

                  className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  required

                  className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
                />
                <button

                  type="submit"
                  className="sm:w-[450px] font-semibold hover:bg-white hover:text-blue-600 hover:border hover:border-blue-400 p-2 px-6 rounded-lg text-white bg-blue-600"
                >
Sign Up
                </button>
               
              </form>
              <div className="flex gap-2 sm:text-[17px] justify-center mt-2">
                <p>Already have an account?</p>
                <Link to={"/login"}>
                  <span className="text-blue-800 underline">Sign In</span>
                </Link>
              </div>

            </div>
          </div>
          <Footer />
        </div>
      );
    };

export default SignUp
