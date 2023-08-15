import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import supabase from "../../supabase";

const TestFriendSearchPage = () => {
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
          .select("gamertag, id")
          .in("id", linkedUserIds);

        if (profilesError) {
          console.error("Error fetching profiles data:", profilesError);
          return;
        }

        setLinkedUsersProfiles(profilesData);
        console.log(linkedUsersProfiles);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLinkedUsersProfiles();
  }, [gameName]);

  const handleAddFriend = async (friendId) => {
    try {
      // Get the logged-in user's ID
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Insert a row into the friends table
      const { error: insertError } = await supabase.from("friends").upsert([
        {
          user_id: user.id,
          friend_id: friendId,
          status: false,
        },
      ]);

      if (insertError) {
        console.error("Error inserting friend:", insertError);
      } else {
        console.log("Friend added successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Linked Users' Profiles for {gameName}</h1>
      <ul>
        {linkedUsersProfiles.map((profile) => (
          <li key={profile.id}>
            {profile.gamertag}
            <button
              onClick={() => handleAddFriend(profile.id)} // Pass the profile ID as friend_id
              className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Add Friend
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestFriendSearchPage;
