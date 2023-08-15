import { useEffect, useState } from "react";
import supabase from "../../supabase";
import CreateUserForm from "./CreateUserForm";

import edit from "../assets/icons/edit.png";
import Avatar1 from "../assets/Avatars/Avatar1.png";
import Avatar2 from "../assets/Avatars/Avatar2.png";
import Avatar3 from "../assets/Avatars/Avatar3.png";
import Avatar4 from "../assets/Avatars/Avatar4.png";
import Avatar5 from "../assets/Avatars/Avatar5.png";
import Avatar6 from "../assets/Avatars/Avatar6.png";
import Avatar7 from "../assets/Avatars/Avatar7.png";
import Avatar8 from "../assets/Avatars/Avatar8.png";
import Avatar9 from "../assets/Avatars/Avatar9.png";
import Avatar10 from "../assets/Avatars/Avatar10.png";
import Avatar11 from "../assets/Avatars/Avatar11.png";
import Avatar12 from "../assets/Avatars/Avatar12.png";

const avatarOptions = {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
  Avatar12,
};

const ProfileData = () => {
  const [profileData, setProfileData] = useState([]);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [session, setSession] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null); // State to store user's avatar image
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    async function fetchUserProfile() {
      if (session) {
        const { data: user, error } = await supabase
          .from("profiles")
          .select("avatar")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching user profile:", error);
        } else {
          setUserAvatar(avatarOptions[user?.avatar]);
        }
      }
    }

    fetchUserProfile();
  }, [session]);

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
    console.log("Edit icon clicked");
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
          {session && (
            <img src={userAvatar} alt="Avatar" className="profileAvatar" />
          )}

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
        </div>
      ))}

      {(showCreateUserForm ||
        (profileData.length > 0 && profileData[0].gamertag === null)) && (
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
