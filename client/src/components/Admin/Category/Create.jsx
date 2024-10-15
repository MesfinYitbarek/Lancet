import { useState } from "react";
import { useSelector } from "react-redux";

const Create = ({ isOpen, onClose }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({ name: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setError("Category name is required");
            return;
        }
        try {
            setLoading(true);
            setError(null);

            const res = await fetch("/api/category/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    userRef: currentUser._id
                }),
            });

            const data = await res.json();
            if (data.success === false) {
                setLoading(false);
                setError(data.message || "Failed to create category");
                return;
            }
            setLoading(false);
            onClose();
        } catch (error) {
            setLoading(false);
            setError(error.message || "An unexpected error occurred");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Create Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Category Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter category name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-800 border border-transparent rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating..." : "Create Category"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;