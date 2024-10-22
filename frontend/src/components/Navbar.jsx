import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="logo text-xl font-bold">Logo</div>
      <ul className="nav-links flex space-x-4">
        <li className="hover:text-gray-400">Home</li>
        <li className="hover:text-gray-400">Rentals</li>
        <li className="hover:text-gray-400">Profile</li>
      </ul>
    </nav>
  )
}

export default Navbar
