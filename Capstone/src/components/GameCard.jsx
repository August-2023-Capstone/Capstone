import React from "react";
import supabase from "../../../supabase";

const GameCard = ({ game }) => {
  const handleAddToDatabase = async () => {
    // Prepare the data for insertion
    const gameData = {
      name: game.name,
      genre: game.genres,
      art: game.background_image,
      platform: game.platforms,

      // Other properties as needed
    };

    // Insert the data into the Supabase table
    const { data, error } = await supabase.from("games").insert(gameData);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully:", data);
    }
  };

  return (
    <div className="gameCard">
      <img
        className="w-full h-full object-cover"
        src={game.background_image}
        alt={game.name}
      />
      <h2>{game.name}</h2>
      <p>
        Genre:{" "}
        {game.genres.map((genre) => (
          <span key={genre.id}>{genre.name}, </span>
        ))}
      </p>
      <p>
        Platform:{" "}
        {game.platforms.map((platform) => (
          <span key={platform.platform.id}>{platform.platform.name}, </span>
        ))}
      </p>
      <button className="gameCardButton" onClick={handleAddToDatabase}>
        +
      </button>{" "}
    </div>
  );
};

export default GameCard;
