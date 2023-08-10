import { useEffect, useState } from "react";
import supabase from "../../../supabase";

const ProfileData = () => {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user.id);
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id);
      console.log(data);
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setProfileData(data);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      {/* <h1>Profiles List</h1> */}
      {profileData.map((profile) => (
        <div key={profile.id} className="ProfileData">
          <p className="ProfileGamertag">Gamertag: {profile.gamertag}</p>
          <p className="ProfileTimezone">Timezone: {profile.timezone}</p>

          <p className="ProfilePlatform">Platform: {profile.platform}</p>

          {/* Add other profile properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default ProfileData;
