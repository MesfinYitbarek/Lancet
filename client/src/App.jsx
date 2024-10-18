import { BrowserRouter , Route, Routes } from 'react-router-dom';
import '../firebase'
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Services from './pages/Services';
import Training from './pages/Trainig';
import CourseDetail from './pages/CourseDetail';
import AdminContainer from './pages/Containers/Admin';
import Instructor from './pages/Containers/Instructor';
import StudentContainer from './pages/Containers/Student';
import LogIn from './pages/Authentication/LogIn';
import SignUp from './pages/Authentication/SignUp';
import Create from './components/Admin/Category/Create';
import EditCourse from './components/Instructor/EditCourse';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/training" element={<Training />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/admin" element={<AdminContainer />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/student" element={<StudentContainer />} />
        <Route path="/create-category" element={<Create />} />
        <Route path="/course-edit/:id" element={<EditCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;