import React, { useEffect, useState } from "react";

const MaxsTestComponent = () => {
  // Step 2: Create a state variable to hold the fetched data
  const [data, setData] = useState([]);

  // Step 3: Use useEffect to trigger the API request
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request
        const response = await fetch(
          'https://api.rawg.io/api/games?key=708a4757c9d748448c87455a3ecd365c&search="dark%20souls"'
        );
        const jsonData = await response.json();

        // Step 4: Update the state with the fetched data
        setData(jsonData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // The empty dependency array means this will run only once when the component mounts

  // Step 5: Render the data
  return (
    <div>
      <h1>Dark Souls Games:</h1>
      <ul>
        {data.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MaxsTestComponent;
