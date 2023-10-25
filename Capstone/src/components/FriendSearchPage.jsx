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

  const [linkedUsersProfiles, setLinkedUsersProfiles] = useState([]);
  const [friendIds, setFriendIds] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    // Fetch the logged-in user's ID
    const fetchLoggedInUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setLoggedInUserId(user.id);
    };

    fetchLoggedInUserId();
  }, []);

  useEffect(() => {
    // Fetch friend IDs where the logged-in user is user_id
    const fetchFriendIds = async () => {
      try {
        const { data: friendData, error: friendError } = await supabase
          .from("friends")
          .select("friend_id")
          .eq("user_id", loggedInUserId);

        if (friendError) {
          console.error("Error fetching friend IDs:", friendError);
          return;
        }

        setFriendIds(friendData.map((friend) => friend.friend_id));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Fetch friend IDs where the logged-in user is friend_id
    const fetchUserIds = async () => {
      try {
        const { data: userData, error: userError } = await supabase
          .from("friends")
          .select("user_id")
          .eq("friend_id", loggedInUserId);

        if (userError) {
          console.error("Error fetching user IDs:", userError);
          return;
        }

        setFriendIds((prevIds) => [
          ...prevIds,
          ...userData.map((user) => user.user_id),
        ]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (loggedInUserId) {
      fetchFriendIds();
      fetchUserIds();
    }
  }, [loggedInUserId]);

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

        // Query the profiles table to get gamertags based on user_id's
        const { data: profilesData, error: profilesError } = await supabase
          .from("profiles")
          .select("gamertag, id, timezone, platform, avatar")
          .in("id", linkedUserIds);

        if (profilesError) {
          console.error("Error fetching profiles data:", profilesError);
          return;
        }

        setLinkedUsersProfiles(profilesData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLinkedUsersProfiles();
  }, [gameName]);

  return (
    <div className="flex m-4">
      <div className="w-1/2">
        <GameDetails gameName={gameName} />
      </div>
      <div className="w-1/2 justify-center">
        <GamePlayers
          linkedUsersProfiles={linkedUsersProfiles}
          gameName={gameName}
          friendIds={friendIds}
          loggedInUserId={loggedInUserId}
        />
      </div>
    </div>
  );
};

export default FriendSearchPage;
