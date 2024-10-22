import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { clearBike } from "../../../redux/feature/bike/bikeSlice";

const RentalForm = ({ showRentalForm, setShowRentalForm }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages

  const bike = useSelector((state) => state.bike.bikeInfo);
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const calculateTotalCost = () => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const hours = (end - start) / (1000 * 60 * 60);
    setTotalCost(hours * bike.pricePerHour);
  };

  const handleSubmit = () => {
    fetch("/api/rentals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id, // Replace with logged-in user's ID
        bikeId: bike.id,
        rentalStartTime: startTime,
        rentalEndTime: endTime,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Rental created:", data);
        setErrorMessage(""); // Clear any previous error messages
        setShowRentalForm(false);
        dispatch(clearBike());
      })
      .catch((error) => {
        console.error("Error creating rental:", error);
        setErrorMessage("Failed to create rental. Please try again."); // Set error message
      });
  };

  return (
    <div
      className={`${
        showRentalForm ? "" : "hidden"
      } absolute sm:translate-x-[20%] top-4 w-full sm:w-[70%] mx-auto p-4 bg-gray-900 text-white rounded-2xl`}
    >
      <div className="flex justify-end items-center text-lg">
        <div
          className="cursor-pointer"
          onClick={() => {
            setShowRentalForm(false);
            dispatch(clearBike());
          }}
        >
          <RxCross1 />
        </div>
      </div>
      <div className="text-3xl font-bold mb-4">Rent {bike && bike?.model}</div>
      <div className="w-[60%] sm:w-[40%]">
        <img
          src="https://cdn.magicdecor.in/com/2024/02/08155013/The-Bike-Rider-Wallpaper-for-Wall.jpg"
          alt={bike && bike?.model}
          className="w-full h-auto"
        />
      </div>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          Start Time:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border rounded px-4 py-2 bg-gray-700 text-white"
          />
        </label>
        <label className="flex flex-col">
          End Time:
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border rounded px-4 py-2 bg-gray-700 text-white"
          />
        </label>
        <button
          onClick={calculateTotalCost}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Calculate Total Cost
        </button>
        {totalCost > 0 && <p>Total Cost: ${totalCost}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-500"
        >
          Confirm Rental
        </button>
      </div>
    </div>
  );
};

export default RentalForm;
