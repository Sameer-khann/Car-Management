import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../redux/slices/carSlice";
import CarCard from "../components/CarCard";
import CarForm from "../components/CarForm";

const Home = () => {
  const dispatch = useDispatch();
  const { cars, loading, error } = useSelector((state) => state.cars); // cars is an object with a cars array
  const { user } = useSelector((state) => state.auth);

  // Extract the array from cars.cars
  const carList = cars.cars || [];

  useEffect(() => {
    if (user) {
      // Fetch cars only if the user is logged in
      dispatch(fetchCars());
    }
  }, [dispatch, user]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {user ? (
        <>
          <CarForm />
          {loading && <p>Loading cars...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {carList.length > 0 ? (
              carList.map((car) => <CarCard key={car._id} car={car} />)
            ) : (
              !loading && (
                <p className="text-gray-600 col-span-full text-center">
                  No cars found. Add a car to get started!
                </p>
              )
            )}
          </div>
        </>
      ) : (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold mb-4">Welcome to Car Management</h2>
          <p className="text-gray-600">
            Please <span className="text-blue-500 font-semibold">log in</span>{" "}
            to view and manage cars.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
