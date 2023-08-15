import { useEffect, useState } from "react";
import supabase from "../../supabase";
import CreateUserForm from "./CreateUserForm";

const ProfileData = () => {
  const [profileData, setProfileData] = useState([]);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);

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
        if (data.length > 0 && data[0].gamertag === null) {
          setShowCreateUserForm(true);
        }
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
      {showCreateUserForm && <CreateUserForm />}
    </div>
  );
};

export default ProfileData;
