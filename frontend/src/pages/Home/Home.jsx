// HomePage.js
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AvailableBikes from "./components/AvailableBikes";
// import axios from 'axios'; // Removed axios import

const Home = () => {
  

  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-auto">
      <Navbar />
      <AvailableBikes />
    </div>
  );
};

export default Home;
