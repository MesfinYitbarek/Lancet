import React from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const LogIn = () => {


    return (
        <div className="dark:bg-gray-800 bg-slate-50">
          <Header />
          <div className="flex justify-center items-center">
            <div className="shadow-sm flex flex-col justify-center items-center dark:bg-gray-400 p-[2%] rounded-2xl sm:w-[650px] bg-slate-50 border border-slate-300 m-[3%]">
              <h1 className="m-3 font-serif sm:text-[22px] text-blue-600">Hi, Welcome back!</h1>
              <form  action="" className="flex flex-col justify-between items-center gap-6">
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  required
                  
                  className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3 focus:outline-none"
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
                 LogIn
                </button>
                
              </form>
              <div className="flex gap-2 sm:text-[17px] justify-center mt-2">
                <p>Don't have an account?</p>
                <Link to="/sign-up">
                  <span className="text-blue-800 underline">Sign Up</span>
                </Link>
              </div>
              <div className="flex gap-2 sm:text-[17px] justify-center mt-2">
                <p>Forgot your password?</p>
                <Link to="/forgot-password">
                  <span className="text-blue-800 underline">Reset Password</span>
                </Link>
              </div>
              <div className="">

              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    };

export default LogIn
