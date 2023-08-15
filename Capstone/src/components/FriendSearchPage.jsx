import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import supabase from "../../supabase";
import GameDetails from "./GameDetails";
import GamePlayers from "./GamePlayers";

const FriendSearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gameName = searchParams.get("gameName");
  console.log(gameName);

  const [linkedUsersProfiles, setLinkedUsersProfiles] = useState([]);
  useEffect(() => {
    const fetchLinkedUsersProfiles = async () => {
      try {
        // Query the games table to get the game_id based on gameName
        const { data: gameData, error: gameError } = await supabase
          .from("games")
          .select("id")
          .eq("name", gameName)
          .single();

        if (gameError) {
          console.error("Error fetching game data:", gameError);
          return;
        }

        // Query the linked_games table to get user_id's based on game_id
        const { data: linkedGamesData, error: linkedGamesError } =
          await supabase
            .from("linked_games")
            .select("user_id")
            .eq("game_id", gameData.id);

        if (linkedGamesError) {
          console.error("Error fetching linked games data:", linkedGamesError);
          return;
        }

        // Extract user_id's from linked games data
        const linkedUserIds = linkedGamesData.map(
          (linkedGame) => linkedGame.user_id
        );

        console.log(linkedUserIds);

        // Query the profiles table to get gamertags based on user_id's
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("gamertag, id, timezone, platform")
          .in("id", linkedUserIds);

        if (profilesError) {
          console.error("Error fetching profiles data:", profilesError);
          return;
        }

        setLinkedUsersProfiles(profilesData);
        console.log(profilesData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLinkedUsersProfiles();
  }, [gameName]);

  return (
    <div className="bg-[#151515] flex">
      <div className="w-1/4">
        <GameDetails />
      </div>
      <div className="flex-grow flex">
        <GamePlayers
          linkedUsersProfiles={linkedUsersProfiles}
          gameName={gameName}
        />
      </div>
    </div>
  );
};

export default FriendSearchPage;
