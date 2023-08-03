import React, { useState, useEffect } from "react";

const AddGameModal = ({ closeModal }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchGames();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-30">
      <div className="bg-gray-800 text-white w-96 p-4 rounded-lg shadow-lg h-3/4 overflow-y-auto">
        <div className="flex justify-center mb-4">
          <button
            onClick={closeModal}
            className="text-white text-opacity-70 hover:text-opacity-100"
          >
            Close
          </button>
        </div>
        <div className="relative mt-4">
          <form>
            <input
              type="text"
              placeholder="Search 300+ Games"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full py-2 pl-10 pr-4 rounded-md bg-gray-700 text-white"
            />
            <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 13.293a1 1 0 0 1-1.414 0L4 10.414l-.707.707a1 1 0 1 1-1.414-1.414l2-2a1 1 0 0 1 1.414 0L9 9.586l4.293-4.293a1 1 0 1 1 1.414 1.414L9.414 13.293a1 1 0 0 1-1.121.182z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <div className="mt-4 space-y-4">
          {searchResults.map((game) => (
            <div key={game.name} className="flex items-center space-x-4">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-grow">
                <p className="text-lg font-medium">{game.name}</p>
                <p className="text-gray-400 text-sm">
                  Genres:{" "}
                  {game.genres.map((genre, index) => (
                    <span key={genre.id}>
                      {index > 0 && ", "}
                      {genre.name}
                    </span>
                  ))}
                </p>
                <p className="text-gray-400 text-sm">
                  Platforms:{" "}
                  {game.platforms.map((platform, index) => (
                    <span key={platform.platform.id}>
                      {index > 0 && ", "}
                      {platform.platform.name}
                    </span>
                  ))}
                </p>
              </div>
              <button className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.293 13.293a1 1 0 0 1-1.414 0L4 10.414l-.707.707a1 1 0 1 1-1.414-1.414l2-2a1 1 0 0 1 1.414 0L9 9.586l4.293-4.293a1 1 0 1 1 1.414 1.414L9.414 13.293a1 1 0 0 1-1.121.182z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddGameModal;
