import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCarById, updateCar, deleteCar } from "../redux/slices/carSlice";
import { toast } from "react-toastify";

const CarDetails = () => {
  const { id } = useParams(); // Get car ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", description: "", tags: "" });
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { car, loading, error } = useSelector((state) => state.cars);

  // Fetch car by ID when the component mounts
  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id)); // Dispatch action to fetch car details
    }
  }, [dispatch, id]);

  // Once car is fetched, update formData with car details
  useEffect(() => {
    if (car) {
      setFormData({
        title: car.car.title,
        description: car.car.description,
        tags: car.car.tags ? car.car.tags.join(", ") : "", // Check if tags exist before joining
      });
      setImages(car.car.images || []); // Set car images, default to empty array if undefined
    }
  }, [car]);

  // Handle input changes for form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image changes
  const handleImageChange = (e) => {
    setImages([...e.target.files]); // Update images array
  };

  // Handle form submission to update car
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    images.forEach((img) => data.append("images", img)); // Append images to FormData

    try {
      console.log("Dispatching updateCar...");
      const updatedCar = await dispatch(updateCar({ id, data })).unwrap();
      console.log("Car updated successfully: ", updatedCar);

      toast.success("Car updated successfully!");
      console.log("Navigating to homepage...");
      navigate("/"); // Ensure this runs after success
    } catch (err) {
      console.error("Error Updating Car:", err);
      toast.error("Error updating car!");
    }
  };

  // Handle car deletion
  const handleDelete = () => {
    dispatch(deleteCar(id)) // Dispatch action to delete car
      .then(() => {
        toast.success("Car deleted successfully!");
        navigate("/"); // Navigate back to homepage
      })
      .catch(() => {
        toast.error("Error deleting car!");
      });
  };

  // Handle carousel navigation
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 118 8"
            ></path>
          </svg>
          <span className="text-lg text-gray-600">Loading...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      ) : (
        <div>
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-extrabold text-center text-gray-900">
              {formData.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Car Image Section */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-full h-80 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg overflow-hidden shadow-xl">
                  {images.length > 0 && (
                    <>
                      <img
                        src={images[currentImageIndex]}
                        alt={`Slide ${currentImageIndex + 1}`}
                        className="w-full h-full p-5 object-contain transition-all duration-300"
                      />
                      <button
                        onClick={handlePrevImage}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-r from-indigo-200 via-blue-300 to-purple-400 text-white p-3 rounded-full hover:bg-gradient-to-r hover:from-indigo-300 hover:via-blue-400 hover:to-purple-500 focus:outline-none"
                      >
                        &lt;
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-r from-indigo-200 via-blue-300 to-purple-400 text-white p-3 rounded-full hover:bg-gradient-to-r hover:from-indigo-300 hover:via-blue-400 hover:to-purple-500 focus:outline-none"
                      >
                        &gt;
                      </button>
                    </>
                  )}
                </div>
                <div className="space-y-2 w-full px-4">
                  <h2 className="text-xl font-semibold text-gray-800">Description</h2>
                  <p className="text-gray-700">{formData.description}</p>
                  <h3 className="text-lg font-semibold text-gray-800">Tags</h3>
                  <p className="text-gray-600">{formData.tags}</p>
                </div>
              </div>

              {/* Car Edit Form Section */}
              <div className="bg-white p-6 rounded-lg shadow-xl space-y-6">
                <h2 className="text-2xl font-semibold text-center text-indigo-700">
                  Edit Car Details
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label className="text-gray-600 mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-600 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="p-3 h-40 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-600 mb-2">Tags</label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., Comfort, IconicSUV"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-600 mb-2">Images</label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Update Car
                  </button>
                </form>
                <button
                  onClick={handleDelete}
                  className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Car
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
