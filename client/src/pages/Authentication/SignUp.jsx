import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(formData)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const res = await fetch('/api/user/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(" error", error.message);
    }
  };
  return (
    <div className=" bg-slate-50">
      <Header />
      <div className="  flex justify-center items-center">
        <div className="dark:bg-gray-400 p-[5%] rounded-2xl sm:w-[650px] bg-white shadow-xl  border-slate-300 m-[5%]">
          <h1 className="mb-3 font-serif sm:text-[28px] text-blue-600 text-center">Create an Account</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-center gap-6">
            <input
              type="text"
              placeholder="Username"
              id="username"
              onChange={handleChange}
              required
              className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              required
              onChange={handleChange}
              className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              required
              onChange={handleChange}
              className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3"
            />
            <button
              disabled={loading}
              type="submit"
              className="sm:w-[450px] font-semibold hover:bg-white hover:text-blue-600 hover:border hover:border-blue-400 p-2 px-6 rounded-lg text-white bg-blue-600"
            >
              {loading ? "Loading..." : "Register"}
            </button>
            {error && <p className=" text-red-500 mt-5">{error}</p>}
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
