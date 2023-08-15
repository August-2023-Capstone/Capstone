import React, { useEffect, useState } from "react";
import supabase from "../../supabase";

const GameDetails = ({ gameName }) => {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    // Define the function to fetch game details
    const fetchGameData = async () => {
      const { data, error } = await supabase
        .from("games")
        .select("genre, art, platform")
        .eq("name", gameName)
        .single();

      if (error) {
        console.error("Error fetching game data:", error.message);
      } else {
        setGameData(data);
      }
    };

    fetchGameData();
  }, [gameName]);

  return (
    <div className="text-white text-2xl font-semibold mb-4 text-center">
      {gameData ? (
        <>
          <div>Game Details</div>
          <div>Name: {gameName}</div>
          <div>Genre: {gameData.genre}</div>
          <div>Art: {gameData.art}</div>
          <div>Platform: {gameData.platform}</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GameDetails;
