import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  // Fallback image if no images are
  const defaultImage = "https://via.placeholder.com/150";
  const imageUrl = car.images && car.images.length > 0 ? car.images[0] : defaultImage;

  return (
    <div className="bg-white rounded shadow-md p-4 hover:shadow-lg transition-shadow">
      {/* Car image */}
      <img
        src={imageUrl}
        alt={car.title || "Car Image"}
        className="w-full h-40 object-contain overflow-hidden rounded-lg mb-4"
      />
      
      {/* Car title */}
      <h2 className="text-lg font-bold mb-2">{car.title || "Untitled Car"}</h2>
      
      {/* Car description */}
      <p className="text-gray-600 mb-4">
        {car.description
          ? `${car.description.substring(0, 100)}...`
          : "No description available."}
      </p>
      
      {/* Tags (if available) */}
      {car.tags && car.tags.length > 0 && (
        <div className="mb-4">
          {car.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* View details link */}
      <Link
        to={`/cars/${car._id}`}
        className="text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default CarCard;
