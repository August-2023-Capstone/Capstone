/** @format */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/icons/image0copy.png";
import speechBubbleIcon from "../assets/icons/speechbubble.png";
import settingsIcon from "../assets/icons/settings.png";
import magnify from "../assets/icons/magnify.png";
import x from "../assets/icons/x.png";
import Login from "./Login";
import Search from "./Search";

const TestNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#151515] p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-white text-3xl font-bold flex-grow-0 mr-4">
          SQUAD FINDER
        </Link>
        {/* Render the SearchBar component */}
        <Search />
      </div>
      <div className="flex items-center">
        <Link to="/chat" className="mr-4">
          <img
            src={speechBubbleIcon}
            alt="Speech Bubble Icon"
            className="w-10 h-10"
          />
        </Link>
        <Link to="/profile" className="mr-4">
          <img src={avatar} alt="Logo" className="w-10 h-10 rounded-full" />
        </Link>
        <Link to="/settings">
          <img src={settingsIcon} alt="Settings Icon" className="w-10 h-10" />
        </Link>
        <button
          onClick={() => setShowLoginModal(true)}
          className="text-white mr-4"
        >
          Login
        </button>
        {showLoginModal && (
          <div
            onClick={() => setShowLoginModal(false)}
            className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-10"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Login />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TestNavbar;
