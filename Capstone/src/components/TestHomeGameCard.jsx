import NintendoSwitch from "../assets/Logos/NintendoSwitchLogo.png";
import Playstation from "../assets/Logos/PlaystationLogo.png";
import Windows from "../assets/Logos/WindowsLogo.png";
import Xbox from "../assets/Logos/XboxLogo.png";
import iOS from "../assets/Logos/AppleLogo.png";
import NintendoDS from "../assets/Logos/nintendoDS.png";
import Android from "../assets/Logos/android.png";
import Linux from "../assets/Logos/linux.png";
import macOS from "../assets/Logos/macOS.png";
import wiiU from "../assets/Logos/wiiU.png";
import supabase from "../../supabase";
import { useNavigate } from "react-router-dom";
import AddGameButton from "./AddGameButton";

const HomeGameCard = ({ game, session }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    // Navigate to the FriendSearchPage and pass the game name as a parameter
    navigate(`/friend_search?gameName=${encodeURIComponent(game.name)}`);
  };

  const handleAddToDatabase = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Prepare the data for insertion into the games table
    const gameData = {
      name: game.name,
      genre: game.genres,
      art: game.background_image,
      platform: game.platforms,
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
        } else {
          console.log("Linked game data inserted successfully");
        }
      }
    }
  };

  const platformImages = {
    PC: Windows,
    Xbox: Xbox,
    "Xbox One": Xbox,
    "Xbox Series S/X": Xbox,
    "Xbox 360": Xbox,
    Playstation: Playstation,
    "PlayStation 3": Playstation,
    "PlayStation 4": Playstation,
    "PlayStation 5": Playstation,
    "Nintendo Switch": NintendoSwitch,
    iOS: iOS,
    Android: Android,
    Linux: Linux,
    macOS: macOS,
    "Wii U": wiiU,
  };

  return (
    <div className="HomeGameCard">
      {session ? (
        <a
          href="#"
          className="HomeGameCardImageAnchor"
          onClick={handleImageClick}
        >
          <img
            className="HomeGameCardImage"
            src={game.background_image}
            alt={game.name}
          />
        </a>
      ) : (
        <img
          className="HomeGameCardImage"
          src={game.background_image}
          alt={game.name}
        />
      )}
      <div className="PlatformLogosContainer">
        {game.platforms.map((platform) => (
          <img
            className="PlatformLogos"
            key={platform.platform.id}
            src={`${platformImages[platform.platform.name]}`}
            alt={platform.platform.name}
          />
        ))}
      </div>

      <h3 className="HomeGameCardTitle">{game.name}</h3>

      <div className="HomeGameCardInfo">
        <p>
          {game.genres.map((genre) => (
            <span key={genre.id}>{genre.name}, </span>
          ))}
        </p>
      </div>
      {session && <AddGameButton game={game} />}
    </div>
  );
};

export default HomeGameCard;
