import { useEffect, useState } from "react";
import NintendoSwitch from "../assets/Logos/NintendoSwitchLogo.png";
import Playstation from "../assets/Logos/PlaystationLogo.png";
import Windows from "../assets/Logos/WindowsLogo.png";
import Xbox from "../assets/Logos/XboxLogo.png";
import iOS from "../assets/Logos/AppleLogo.png";
import NintendoDS from "../assets/Logos/nintendoDS.png";

const GameDetails = ({ gameName }) => {
  const platformImages = {
    PC: Windows,
    Xbox: Xbox,
    "Xbox One": Xbox,
    "Xbox Series S/X": Xbox,
    Playstation: Playstation,
    "PlayStation 4": Playstation,
    "PlayStation 5": Playstation,
    "Nintendo Switch": NintendoSwitch,
    iOS: iOS,
  };
  const [gameData, setGameData] = useState(null);
  const [gameDescription, setGameDescription] = useState(null);
  const [gameId, setGameId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request
        const response = await fetch(
          `https://api.rawg.io/api/games?key=708a4757c9d748448c87455a3ecd365c&search=${encodeURIComponent(
            gameName
          )}&page_size=1`
        );
        const jsonData = await response.json();

        setGameData(jsonData.results[0]); // Assuming you expect only one result
        setGameId(jsonData.results[0].slug);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDescription = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${encodeURIComponent(
            gameId
          )}?key=708a4757c9d748448c87455a3ecd365c`
        );
        const jsonData = await response.json();

        setGameDescription(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchDescription(); // Call the fetchData function
  }, [gameName, gameId]);

  console.log(gameData);
  console.log(gameId);
  console.log(gameDescription);

  return (
    <div className="text-white mb-4 text-center">
      {gameData ? (
        <>
          <div className="mb-4 text-3xl font-semibold ">Game Details</div>
          <img
            className="w-3/4 h-auto mb-2 mx-auto"
            src={gameData.background_image}
            alt={gameData.name}
          />
          <div className="mb-2 text-3xl font-semibold ">{gameName}</div>
          <p className="mb-2">
            {gameData.genres.map((genre) => (
              <span key={genre.id}>{genre.name}, </span>
            ))}
          </p>
          <div className="flex justify-center space-x-4">
            {gameData.platforms.map((platform) => (
              <img
                className="PlatformLogos"
                key={platform.platform.id}
                src={`${platformImages[platform.platform.name]}`}
                alt={platform.platform.name}
              />
            ))}
          </div>
          {gameDescription && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Description</h3>
              <p>{gameDescription.description}</p>
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GameDetails;
