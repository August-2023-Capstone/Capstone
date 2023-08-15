import { useEffect, useState } from "react";
import supabase from "../../../supabase";
import CreateUserForm from "./CreateUserForm";
import Avatar1 from "../assets/Avatars/Avatar1.png";
import edit from "../assets/icons/edit.png";
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
  const handleEditIconClick = () => {
    setShowCreateUserForm(true);
  };

  const handleCloseModal = () => {
    setShowCreateUserForm(false);
  };
  return (
    <div>
      {/* <h1>Profiles List</h1> */}
      {profileData.map((profile) => (
        <div key={profile.id} className="ProfileData">
          <img src={Avatar1} alt="" className="profileAvatar" />
          <div className="profileDataMiddleContainer">
            <p className="ProfileGamertag">Gamertag: {profile.gamertag}</p>
            <p className="ProfileTimezone">Timezone: {profile.timezone}</p>

            <p className="ProfilePlatform">Platform: {profile.platform}</p>
          </div>
          <img
            src={edit}
            alt=""
            className="editProfileIcon"
            onClick={handleEditIconClick}
          />
          {/* Add other profile properties as needed */}
        </div>
      ))}
      {profileData.length > 0 && profileData[0].gamertag === null && (
        <div className="modalBackground">
          <div className="modalContent">
            <CreateUserForm />
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileData;
