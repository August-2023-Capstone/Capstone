import { useState } from "react";
import PropTypes from "prop-types";
import supabase from "../../supabase";

const RemoveGameButton = ({ game }) => {
  const [buttonText, setButtonText] = useState("Remove from Favorites"); // Initialize button text state

  const handleRemoveFromDatabase = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

      const linkedGameData = {
        user_id: user.id,
        game_id: gameSelectData.id,
      };

      const { error: linkedGameRemoveError } = await supabase
        .from("linked_games")
        .delete()
        .eq("user_id", user.id)
        .eq("game_id", gameSelectData.id);

      if (linkedGameRemoveError) {
        console.error(
          "Error removing linked game data:",
          linkedGameRemoveError
        );
      } else {
        console.log("Linked game data removed successfully");
        setButtonText("Game Removed");
      }
    }
  };

  return (
    <button
      onClick={handleRemoveFromDatabase}
      className="bg-[#444444] hover:bg-[#373737] text-white font-bold py-1 px-3 rounded-sm text-xs mb-2"
      disabled={
        buttonText === "Game Added" || buttonText === "Game Already Added"
      }
    >
      {buttonText}
    </button>
  );
};

RemoveGameButton.propTypes = {
  game: PropTypes.object.isRequired,
};

export default RemoveGameButton;
