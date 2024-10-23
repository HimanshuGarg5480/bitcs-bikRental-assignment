import { useState } from "react";
import Navbar from "../../components/Navbar";
import AvailableBikes from "./components/AvailableBikes";
import RentalForm from "./components/RentalForm";
// import axios from 'axios'; // Removed axios import

const Home = () => {
  const [showRentalForm,setShowRentalForm]=useState(false);
  return (
    <>
      <RentalForm showRentalForm={showRentalForm} setShowRentalForm={setShowRentalForm}/>
      <div className="h-screen w-screen overflow-x-hidden overflow-y-auto">
        <AvailableBikes setShowRentalForm={setShowRentalForm}/>
      </div>
    </>
  );
};

export default Home;
