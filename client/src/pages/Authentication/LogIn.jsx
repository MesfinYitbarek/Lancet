import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const LogIn = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.username || !formData.password) {
      setError('Both username and password are required.');
      return;
    }

    try {
       setLoading(true);
      dispatch(signInStart());
      const res = await fetch('/api/user/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to sign in.');
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      setError(error.message);
      dispatch(signInFailure(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-gray-800 bg-slate-50">
      <Header />
      <div className="flex justify-center items-center">
        <div className=" flex flex-col justify-center items-center dark:bg-gray-400 p-[2%] rounded-2xl sm:w-[650px] bg-white shadow-xl  border-slate-300 m-[3%]">
          <h1 className="m-3 font-serif sm:text-[22px] text-blue-600">Hi, Welcome back!</h1>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-center gap-6">
            <input
              type="text"
              placeholder="Username"
              id="username"
              required
              onChange={handleChange}
              className="dark:bg-slate-100 sm:w-[450px] h-10 rounded-lg border border-slate-300 p-3 focus:outline-none"
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
              {loading ? "Loading..." : "Sign In"}
            </button>
            {error && <p className="text-red-500 mt-5">{error}</p>}
          </form>
          <div className="flex gap-2 sm:text-[17px] justify-center mt-2">
            <p>Don't have an account?</p>
            <Link to="/sign-up">
              <span className="text-blue-800 underline">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LogIn
