import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../redux/slices/carSlice";
import CarCard from "../components/CarCard";
import CarForm from "../components/CarForm";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.cars);
  const { user } = useSelector((state) => state.auth);

  // State to handle the visibility of the Add Car form
  const [showCarForm, setShowCarForm] = useState(false);

  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Extract the array from cars.cars
  const carList = cars.cars || [];

  useEffect(() => {
    if (user) {
      // Fetch cars only if the user is logged in
      dispatch(fetchCars());
    }
  }, [dispatch, user]);

  // Toggle the visibility of the Car Form
  const toggleCarForm = () => {
    setShowCarForm(!showCarForm);
  };

  // Handle the search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the cars based on the search query (title, description, tags)
  const filteredCars = carList.filter((car) => {
    const searchText = searchQuery.toLowerCase();
    return (
      car.title.toLowerCase().includes(searchText) ||
      car.description.toLowerCase().includes(searchText) ||
      car.tags.some((tag) =>
        tag.toLowerCase().includes(searchText)
      )
    );
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {user ? (
        <>
          {/* Search Bar Section */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search cars by title, description, or tags..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full p-4 pl-10 border-2 border-gray-300 rounded-lg shadow-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <svg
                className="absolute left-3 top-3 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="20"
                height="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 3a8 8 0 110 16 8 8 0 010-16zm0 0l7 7m-7-7l-7 7"
                />
              </svg>
            </div>
          </div>

          {/* Add Car Button or Close Icon */}
          <div className="fixed bottom-6 right-6 z-20">
            <button
              onClick={toggleCarForm}
              className="w-16 h-16 flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-transform duration-300"
            >
              {showCarForm ? (
                <span className="text-3xl">✖</span> // Close icon
              ) : (
                <span className="text-2xl">+</span> // Add Car button
              )}
            </button>
          </div>

          {/* Conditionally render the Car Form */}
          {showCarForm && <CarForm />}

          {/* Loading and Error handling */}
          {loading && <p className="text-center text-lg text-gray-600">Loading cars...</p>}
          {error && <p className="text-center text-lg text-red-600">{error}</p>}

          {/* Display filtered car cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              !loading && (
                <p className="text-gray-600 col-span-full text-center">
                  No cars found matching your search.
                </p>
              )
            )}
          </div>
        </>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-6">Welcome to Car Management</h2>
          <p className="text-lg text-gray-600">
            Please <Link to="/login" className="text-blue-500 font-semibold hover:underline">log in</Link>{" "}
            to view and manage cars.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
