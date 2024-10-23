import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Rental from "./pages/Rentals/Rental";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile/Profile";

const RenderElements = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RenderElements />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/rentals" element={<Rental />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
