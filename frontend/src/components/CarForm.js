import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../redux/slices/carSlice";
import { useNavigate } from "react-router-dom"; // To navigate to login page if not logged in

const CarForm = () => {
  const { user } = useSelector((state) => state.auth); // Get the authentication state
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigate to login page if not authenticated
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      // If user is not logged in, show an alert and prevent form submission
      alert("You must be logged in to add a car!");
      return;
    }

    // If user is logged in, proceed with form submission
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    images.forEach((img) => data.append("images", img));
    dispatch(addCar(data));
  };


  return (
    <div className="flex justify-around items-center">

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-auto">
        <h2 className="text-lg font-bold mb-4">Add/Edit Car</h2>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., sedan, toyota, dealer_name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {images.length > 0 && (
            <p className="text-gray-500 mt-2">{images.length} image(s) selected</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Submit
        </button>
      </form>
      
      {!user &&
        <div className="flex justify-start items-start h-44 bg-gray-100">
          <div className="bg-white p-6 rounded shadow-md w-96 text-center">
            <h2 className="text-lg font-bold mb-4">You need to log in</h2>
            <p className="text-gray-600 mb-4">You must be logged in to submit the form.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default CarForm;
