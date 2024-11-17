import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import { useDispatch } from "react-redux";
import { performUserDetails } from "./redux/slices/authSlice"; // Make sure you import performUserDetails

const App = () => {
  const dispatch = useDispatch(); // Fixed 'const' declaration

  useEffect(() => {
    dispatch(performUserDetails()); // Dispatch to fetch user details
  }, [dispatch]); // Make sure to add dispatch as a dependency to avoid missing updates

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/cars/:id" element={<CarDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
