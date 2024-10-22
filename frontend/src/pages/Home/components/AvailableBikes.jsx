import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBike } from "../../../redux/feature/bike/bikeSlice";

const AvailableBikes = ({setShowRentalForm}) => {
  const [bikes, setBikes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch available bikes using fetch
    fetch("/api/bikes/")
      .then((response) => response.json()) // Parse JSON response
      .then((data) => {
        setBikes(data);
      })
      .catch((error) => {
        console.error("Error fetching bikes:", error); // Handle errors
      });
  }, []);

  const handleRentNow = (bike) => {
    // Logic to handle renting a bike
    dispatch(setBike(bike));
    setShowRentalForm(true);
    console.log("Rent bike with ID:");

  };
  return (
    <div className="h-full w-screen bg-gray-700 text-white px-[5%] pt-5">
      {" "}
      {/* Dark theme background and text color */}
      <div className="mx-auto w-[80%]">
        <h1 className="text-3xl font-bold mb-4">Available Bikes</h1>
        <div className="flex flex-wrap gap-5 text-xs">
          {bikes.map((bike) => (
            <div
              key={bike.id}
              className="border border-gray-700 p-4 rounded shadow bg-gray-900 w-full sm:w-[30%]"
            >
              <div className="h-40 sm:h-20 md:h-32">
                <img
                  src="https://cdn.magicdecor.in/com/2024/02/08155013/The-Bike-Rider-Wallpaper-for-Wall.jpg"
                  alt={bike.model}
                  className="mb-2 h-full w-full object-fill"
                />
              </div>
              <div className="text-xl font-semibold">{bike.model}</div>
              <div>Price per hour: ${bike.pricePerHour}</div>
              <button
                onClick={() => handleRentNow(bike)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 mt-2 rounded text-center" // Darker button with hover effect
              >
                Rent Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableBikes;
