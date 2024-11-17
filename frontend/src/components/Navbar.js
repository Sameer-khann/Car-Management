import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { performLogout } from "../redux/slices/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Create a navigate instance

  const handleLoginRegisterClick = () => {
    // Redirect user to login or register page
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-blue-500 text-white flex justify-between">
      {/* Make Car Management clickable */}
      <Link to="/" className="text-lg font-bold">
        Car Management
      </Link>
      <div>
        {user ? (
          <button
            className="bg-red-500 px-4 py-2 rounded"
            onClick={() => dispatch(performLogout())}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-blue-700 px-4 py-2 rounded"
            onClick={handleLoginRegisterClick}
          >
            Login/Register
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;