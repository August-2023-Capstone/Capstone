import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import magnify from "../assets/icons/magnify.png";
import x from "../assets/icons/x.png";
import supabase from "../../../supabase";
import AddGameButton from "./AddGameButton";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchGames = async () => {
      if (searchTerm.trim().length < 2) {
        // Early return if the search term is too short
        setSearchResults([]);
        return;
      }
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
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchGames();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setDropdownOpen(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
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
            <div
              key={game.id}
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

              <AddGameButton game={game} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
