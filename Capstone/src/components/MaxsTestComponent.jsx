import React, { useEffect, useState } from "react";

const MaxsTestComponent = () => {
  // Step 2: Create a state variable to hold the fetched data
  const [games, setGames] = useState([]);

  // Step 3: Use useEffect to trigger the API request
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request
        const response = await fetch(
          "https://api.rawg.io/api/games?key=708a4757c9d748448c87455a3ecd365c&metacritic=90,100&ordering=-released&dates=2005-01-01,2023-07-01&tags=multiplayer&page_size=10"
        );
        const jsonData = await response.json();

        // Step 4: Update the state with the fetched data
        setGames(jsonData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // The empty dependency array means this will run only once when the component mounts

  // Step 5: Render the data
  return (
    <div>
      <h1>Top 10 Games with Metacritic Score of 90 or above:</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Assuming you want two images per row, adjust grid-cols-* accordingly */}
        {games.map((game) => (
          <div key={game.id} className="flex flex-col items-center">
            <h2>{game.name}</h2>
            <div className="w-40 h-52">
              {/* Define a container size, e.g., w-250 and h-160 */}
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaxsTestComponent;
