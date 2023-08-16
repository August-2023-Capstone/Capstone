import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfileData } from "../reducers/profileSlice";

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
  const dispatch = useDispatch();

  const profileData = useSelector((state) => state.profile.profileData);
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
        dispatch(setProfileData(data)); // Dispatch action to update profileData
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
  const handleCloseModalOutside = (event) => {
    if (event.target.classList.contains("modalBackground")) {
      setShowCreateUserForm(false);
    }
  };
  console.log(profileData);
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
            <p className="ProfilePlatform">
              {profile.pc && "PC"}
              {profile.playstation &&
                (profile.pc ? ", PlayStation" : "PlayStation")}
              {profile.xbox &&
                (profile.pc || profile.playstation ? ", Xbox" : "Xbox")}
              {profile.switch &&
                (profile.pc || profile.playstation || profile.xbox
                  ? ", Switch"
                  : "Switch")}
            </p>
          </div>
          <img
            src={edit}
            alt=""
            className="cursor-pointer"
            onClick={handleEditIconClick}
          />
        </div>
      ))}

      {(showCreateUserForm ||
        (profileData.length > 0 && profileData[0].gamertag === null)) && (
        <div className="modalBackground">
          <div className="modalContent">
            <CreateUserForm />
            <div className="flex justify-center items-center">
              <button
                className="bg-red-800 hover:bg-red-600 text-white font-bold mt-2 py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileData;
