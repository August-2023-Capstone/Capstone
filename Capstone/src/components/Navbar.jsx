/** @format */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/icons/image0copy.png";
import speechBubbleIcon from "../assets/icons/speechbubble.png";
import settingsIcon from "../assets/icons/settings.png";
import magnify from "../assets/icons/magnify.png";
import x from "../assets/icons/x.png";
import Login from "./Login";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchGames();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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

  const fetchGames = async () => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=708a4757c9d748448c87455a3ecd365c&search=${encodeURIComponent(
          searchTerm
        )}&page_size=10`
      );
      const jsonData = await response.json();
      setSearchResults(jsonData.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setDropdownOpen(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <nav className="bg-[#151515] p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-white text-3xl font-bold flex-grow-0 mr-4">
          SQUAD FINDER
        </Link>
        <div className="relative">
          <img
            src={magnify}
            alt="Search Icon"
            className="h-6 w-6 absolute left-3 top-2.5 text-white pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search Games"
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-[#373737] text-white pl-12 py-2 rounded-full w-[1000px] focus:outline-none"
          />
          {searchTerm && (
            <img
              src={x}
              alt="Clear Search Icon"
              className="absolute right-3 top-3 h-4 w-4 cursor-pointer"
              onClick={handleClearSearch}
            />
          )}
          {searchResults.length > 0 && isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute bg-[#373737] rounded-md w-[1000px] mt-2 top-full right-0 left-0 mx-auto text-white"
              style={{ zIndex: 10 }}
            >
              {searchResults.map((game) => (
                <Link
                  to={`/game/${game.id}`}
                  key={game.name}
                  className="block p-2 hover:bg-[#444444] flex items-center"
                >
                  <img
                    className="w-20 h-20 object-cover mr-4"
                    src={game.background_image}
                    alt={game.name}
                  />

                  <div>
                    <h2 className="text-lg font-semibold">{game.name}</h2>
                    <p>
                      Genre:{" "}
                      {game.genres.map((genre) => (
                        <span key={genre.id}>{genre.name}, </span>
                      ))}
                    </p>
                    <p>
                      Platform:{" "}
                      {game.platforms.map((platform) => (
                        <span key={platform.platform.id}>
                          {platform.platform.name},{" "}
                        </span>
                      ))}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
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

export default Navbar;
