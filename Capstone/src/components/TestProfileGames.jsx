import { useEffect, useState } from "react";
import supabase from "../../../supabase";

const TestProfileGames = () => {
  const [profileGames, setProfileGames] = useState([]);

  useEffect(() => {
    const fetchProfileGames = async () => {
      const { data, error } = await supabase.from("games").select();

      console.log(data);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setProfileGames(data);
      }
    };

    fetchProfileGames();
  }, []);
  console.log(profileGames);

  return (
    <div>
      <h1>Games List</h1>
      {profileGames.map((profile) => (
        <div key={profile.id}>
          <p>gamertag: {profile.gamertag}</p>
          <p>Timezone: {profile.timezone}</p>
          <p>Platform: {profile.platform}</p>
          {/* Add other profile properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default TestProfileGames;
