import { useState } from "react";
import PropTypes from "prop-types";
import supabase from "../../supabase";

const SearchAddGameButton = ({ game }) => {
  const [buttonText, setButtonText] = useState("Add to Favorites"); // Initialize button text state

  const handleAddToDatabase = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const platformNames = game.platforms.map(
      (platform) => platform.platform.name
    );

    // Prepare the data for insertion into the games table
    const gameData = {
      name: game.name,
      genre: game.genres.map((genre) => genre.name), // Extract genre names
      art: game.background_image,
      platform: platformNames,
      // Other properties as needed
    };

    // Insert the data into the games table
    const { error: gameInsertError, data: gameInsertData } = await supabase
      .from("games")
      .upsert(gameData, { onConflict: ["name"] }); // Upsert with conflict handling

    if (gameInsertError) {
      console.error("Error inserting game data:", gameInsertError);
    } else {
      console.log("Game data inserted or updated successfully");

      // Get the game's ID whether it's newly inserted or already exists
      const { data: gameSelectData, error: gameSelectError } = await supabase
        .from("games")
        .select("id")
        .eq("name", game.name)
        .single();

      if (gameSelectError) {
        console.error("Error selecting game data:", gameSelectError);
      } else {
        console.log("Game selected successfully:", gameSelectData);

        // Insert a row into the linked_games table
        const linkedGameData = {
          user_id: user.id,
          game_id: gameSelectData.id,
        };

        const { error: linkedGameInsertError } = await supabase
          .from("linked_games")
          .insert([linkedGameData]);

        if (linkedGameInsertError) {
          console.error(
            "Error inserting linked game data:",
            linkedGameInsertError
          );
          setButtonText("Game Already Added");
        } else {
          console.log("Linked game data inserted successfully");

          // Update the button text to "Game Added"
          setButtonText("Game Added");
        }
      }
    }
  };

  return (
    <button
      onClick={handleAddToDatabase}
      className="mr-4 px-4 py-2 rounded-md bg-[#151515] text-white hover:bg-[#373737] focus:outline-none"
      disabled={
        buttonText === "Game Added" || buttonText === "Game Already Added"
      }
      // Disable the button when the text is "Game Added"
    >
      {buttonText}
    </button>
  );
};

SearchAddGameButton.propTypes = {
  game: PropTypes.object.isRequired,
};

export default SearchAddGameButton;
