import { useEffect, useState } from "react";
import supabase from "../../../supabase";

const TestProfileGames = () => {
  const [profileGames, setProfileGames] = useState([]);

  useEffect(() => {
    const fetchProfileGames = async () => {
      const { data, error } = await supabase.from("linked_games").select(
        `
          games (
            id,
            name,
            genre,
            art,
            platform
          )
          `
      );

      console.log(data);

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
  console.log(profileGames);

  return (
    <div>
      <h1>Games List</h1>
      {profileGames.map((game) => (
        <div key={game.id}>
          <h3>{game.name}</h3>
          <p>Genre: {game.genre}</p>
          <p>Platform: {game.platform}</p>
          <img src={game.art} alt={game.name} />
        </div>
      ))}
    </div>
  );
};

export default TestProfileGames;
