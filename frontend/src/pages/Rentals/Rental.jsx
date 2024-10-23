// RentalsPage.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import axios from 'axios'; // Removed axios import

const Rental = () => {
  const [rentals, setRentals] = useState([]);
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    // Fetch rentals for logged-in user
    fetch(`/api/rentals/user/${user.id}`) // Replace with user ID from auth
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        setRentals(data);
      });
  }, []);

  const handleReturnBike = (rentalId) => {
    fetch(`/api/rentals/${rentalId}/return`, {
      method: "PATCH", // Specify the method
      headers: {
        "Content-Type": "application/json", // Set content type
      },
      body: JSON.stringify({
        returnTime: new Date().toISOString(),
      }),
    })
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        console.log("Bike returned:", data);
        // Fetch all rentals again after successful return
        fetch(`/api/rentals/user/${user.id}`) // Replace with user ID from auth
          .then((response) => response.json()) // Convert response to JSON
          .then((data) => {
            setRentals(data); // Update rentals state
          });
      });
  };

  return (
    <div className="min-h-screen mx-auto p-4 bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-4">Your Rentals</h1>
      {rentals.length === 0 ? (
        <p>You have no rentals.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals?.map((rental) => (
            <div
              key={rental.id}
              className="border border-gray-700 p-4 rounded shadow bg-gray-900"
            >
              <h2 className="text-xl font-semibold">{rental.bike.model}</h2>
              <p>Start: {new Date(rental.rentalStartTime).toLocaleString()}</p>
              <p>End: {new Date(rental.rentalEndTime).toLocaleString()}</p>
              <p>Total Cost: ${rental.totalCost}</p>
              {rental.active && (
                <button
                  onClick={() => handleReturnBike(rental.id)}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 mt-2 rounded"
                >
                  Return Bike
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rental;
