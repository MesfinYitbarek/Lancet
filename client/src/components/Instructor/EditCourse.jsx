import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseImageFile, setCourseImageFile] = useState(null);
  const [learningObjectives, setLearningObjectives] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);
  const [modules, setModules] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/courseEdit/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        setFormData(data);
        setLearningObjectives(data.learningObjectives || []);
        setPrerequisites(data.requirements || []);
        setModules(data.curriculum || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category/display");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setCourseImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullFormData = {
      ...formData,
      learningObjectives,
      requirements: prerequisites,
      curriculum: modules,
      userRef: currentUser._id,
      instructor: currentUser.username,
    };

    const storage = getStorage();
    
    try {
      if (courseImageFile) {
        const courseImageRef = ref(storage, `courseImages/${courseImageFile.name}`);
        await uploadBytes(courseImageRef, courseImageFile);
        fullFormData.imageUrl = await getDownloadURL(courseImageRef);
      }

      const res = await fetch(`/api/courses/updatecourses/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(fullFormData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/course/${id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for handling dynamic form fields
  const handleDynamicFieldChange = (setter, index, value) => {
    setter(prev => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });
  };

  const handleAddField = (setter) => {
    setter(prev => [...prev, ""]);
  };

  const handleRemoveField = (setter, index) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleModuleChange = (index, field, value) => {
    setModules(prev => {
      const newModules = [...prev];
      newModules[index] = { ...newModules[index], [field]: value };
      return newModules;
    });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-200 via-indigo-100 to-blue-200 font-lato">
      <div className="container mx-auto py-10 px-4 sm:px-20 lg:px-20">
        <form onSubmit={handleSubmit} className="shadow-sm rounded-lg border text-md border-blue-800 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <InputField
                label="Course Title"
                id="title"
                value={formData.title || ""}
                onChange={handleChange}
                required
              />
              <SelectField
                label="Course Category"
                id="category"
                value={formData.category || ""}
                onChange={handleChange}
                options={categories}
              />
              <FileInput
                label="Course Image"
                id="imageUrl"
                onChange={handleFileChange}
              />
              <SelectField
                label="Course Level"
                id="level"
                value={formData.level || ""}
                onChange={handleChange}
                options={[
                  { name: "All Level", labelName: "All Level" },
                  { name: "Beginner", labelName: "Beginner" },
                  { name: "Intermediate", labelName: "Intermediate" },
                  { name: "Advanced", labelName: "Advanced" },
                ]}
              />
            </div>
            {/* Right Column */}
            <div>
              <TextArea
                label="Course Description"
                id="description"
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
              <InputField
                label="Course Duration (e.g., 10 weeks)"
                id="duration"
                value={formData.duration || ""}
                onChange={handleChange}
                required
              />
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPaid"
                    checked={formData.isPaid || false}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-gray-700 font-bold">Paid Course</span>
                </label>
                {formData.isPaid && (
                  <InputField
                    label="Course Price"
                    id="price"
                    type="number"
                    value={formData.price || ""}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                )}
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <DynamicFields
            label="Learning Objectives"
            fields={learningObjectives}
            onAdd={() => handleAddField(setLearningObjectives)}
            onChange={(index, value) => handleDynamicFieldChange(setLearningObjectives, index, value)}
            onRemove={(index) => handleRemoveField(setLearningObjectives, index)}
          />

          {/* Prerequisites */}
          <DynamicFields
            label="Prerequisites"
            fields={prerequisites}
            onAdd={() => handleAddField(setPrerequisites)}
            onChange={(index, value) => handleDynamicFieldChange(setPrerequisites, index, value)}
            onRemove={(index) => handleRemoveField(setPrerequisites, index)}
          />

          {/* Curriculum */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Curriculum</h3>
            {modules.map((module, index) => (
              <div key={index} className="mb-4 border rounded p-4">
                <InputField
                  label={`Module ${index + 1} Title`}
                  value={module.title || ""}
                  onChange={(e) => handleModuleChange(index, "title", e.target.value)}
                  required
                />
                <TextArea
                  label="Module Content"
                  value={module.content || ""}
                  onChange={(e) => handleModuleChange(index, "content", e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(setModules, index)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  Remove Module
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddField(setModules)}
              className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Module
            </button>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-center items-center">
            <button
              className="px-5 bg-blue-800 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
              disabled={loading}
              type="submit"
            >
              {loading ? "Updating Course..." : "Update Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper components
const InputField = ({ label, id, ...props }) => (
    <div className="mb-6">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        id={id}
        className=" appearance-none border   border-blue-800 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...props}
      />
    </div>
  );
  
  const SelectField = ({ label, id, options, ...props }) => (
    <div className="mb-6">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">{label}</label>
      <select
        id={id}
        className=" appearance-none border border-blue-800  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...props}
      >
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
  
  const FileInput = ({ label, id, ...props }) => (
    <div className="mb-6">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type="file"
        id={id}
        className=" appearance-none border border-blue-800 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        {...props}
      />
    </div>
  );
  
  const TextArea = ({ label, id, ...props }) => (
    <div className="mb-6">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">{label}</label>
      <textarea
        id={id}
        className="appearance-none border border-blue-800 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        rows="5"
        {...props}
      ></textarea>
    </div>
  );
  
  const DynamicFields = ({ label, fields, onAdd, onChange, onRemove }) => (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-4">{label}</h3>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={field}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="appearance-none border border-blue-800 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            onClick={() => onRemove(index)}
            type="button"
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="text-blue-500 hover:text-blue-800"
      >
        Add {label}
      </button>
    </div>
  );
  

export default EditCourse;