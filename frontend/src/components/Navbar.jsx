import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="logo text-xl font-bold">Logo</div>
      <ul className="nav-links flex space-x-4">
        <Link to="/">
          <li className="hover:text-gray-400">Home</li>
        </Link>
        <Link to="rentals">
          <li className="hover:text-gray-400">Rentals</li>
        </Link>
        <Link to="profile">
          <li className="hover:text-gray-400">Profile</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
