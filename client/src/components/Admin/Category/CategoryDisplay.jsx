import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight, Delete, Edit as EditIcon } from "@mui/icons-material";
import Create from "./Create";
import Edit from "./Edit";

const CategoryDisplay = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [categories]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category/display");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching categories");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(
        `/api/category/deletecatagory/${categoryId}`
      );

      if (response.data.success) {
        setCategories(categories.filter((cat) => cat._id !== categoryId));
      }
    } catch (err) {
      console.error(err);
      setError("Error deleting category");
    }
  };

  const handleCreateCategory = async (newCategory) => {
    try {
      const response = await axios.post("/api/category/create", newCategory);
      if (response.data.success) {
        fetchCategories();
        setIsCreateModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error creating category");
    }
  };

  const handleEditCategory = async (categoryId, newName) => {
    try {
      const response = await axios.put(`/api/category/updatecatagory/${categoryId}`, { name: newName });
      if (response.data.success) {
        fetchCategories();
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error updating category");
    }
  };

  return (
    <div className={`relative ${isCreateModalOpen || isEditModalOpen ? 'overflow-hidden' : ''}`}>
      <div className={`transition-all duration-300 ${isCreateModalOpen || isEditModalOpen ? 'filter brightness-50' : ''}`}>
        <div className="flex justify-center items-center pt-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md w-full max-w-4xl mt-12 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-blue-800 font-bold text-2xl">Categories</h2>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-800 text-white hover:bg-blue-900 px-4 py-2 rounded-md font-semibold flex items-center"
              >
                Add <ArrowRight className="ml-1" />
              </button>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((data) => (
                    <tr key={data._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => {
                          setEditingCategory(data);
                          setIsEditModalOpen(true);
                        }} className="text-blue-600 hover:text-blue-900 mr-4">
                          <EditIcon fontSize="small" />
                        </button>
                        <button onClick={() => handleDeleteCategory(data._id)} className="text-red-600 hover:text-red-900">
                          <Delete fontSize="small" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
            <Create
              isOpen={isCreateModalOpen}
              onClose={() => setIsCreateModalOpen(false)}
              onCreateCategory={handleCreateCategory}
            />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full m-4">
            <Edit
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              onEditCategory={handleEditCategory}
              category={editingCategory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDisplay;