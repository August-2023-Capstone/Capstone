import { useEffect, useState } from "react";
import supabase from "../../supabase";
import RemoveGameButton from "./RemoveGameButton";
import { useNavigate } from "react-router-dom";

const TestProfileGames = () => {
  const [profileGames, setProfileGames] = useState([]);
  const navigate = useNavigate();

  const handleImageClick = (game) => {
    // Navigate to the FriendSearchPage and pass the game name as a parameter
    navigate(`/friend_search?gameName=${encodeURIComponent(game.name)}`);
  };

  useEffect(() => {
    const fetchProfileGames = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("linked_games")
        .select(
          `
          games (
            id,
            name,
            genre,
            art,
            platform
          )
          `
        )
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        // The 'games' property within each object contains an array of game data
        const gamesData = data.map((item) => item.games);
        setProfileGames(gamesData);
      }
    };

    fetchProfileGames();
  }, []);

  const extractArrayFromString = (stringWithArray) => {
    try {
      const parsedArray = JSON.parse(stringWithArray);

      if (Array.isArray(parsedArray)) {
        return parsedArray.map((item) => {
          if (typeof item === "string") {
            return item;
          } else if (item.name) {
            return item.name;
          } else if (item.platform && item.platform.name) {
            return item.platform.name;
          }
          return "Unknown";
        });
      } else {
        return ["Unknown"];
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  };

  return (
    <div className="ProfileGameCardContainer grid grid-cols-1 md:grid-cols-2 gap-4">
      {profileGames.length > 0 ? (
        profileGames.map((game) => (
          <div key={game.id} className="ProfileGameCard">
            <a
              href="#"
              className="ProfileGameCardImageAnchor"
              onClick={() => handleImageClick(game)}
            >
              <img
                className="ProfileGameCardImage"
                src={game.art}
                alt={game.name}
              />
            </a>

            <div className="ProfileGameCardContent">
              <h2 className="ProfileGameCardTitle">{game.name}</h2>
              <p className="ProfileGameCardInfo">
                Genre: {extractArrayFromString(game.genre).join(", ")}
              </p>
              <p className="ProfileGameCardInfo">
                Platform: {extractArrayFromString(game.platform).join(", ")}
              </p>
            </div>
            <div className="ProfileGameCardButtonContainer">
              <RemoveGameButton game={game} />
            </div>
          </div>
        ))
      ) : (
        <div className="ProfileGameCardEmpty">No games to display.</div>
      )}
    </div>
  );
};

export default TestProfileGames;
