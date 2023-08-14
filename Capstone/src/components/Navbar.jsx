/** @format */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import placeholderAvatar from "../assets/icons/image0copy.png";
import speechBubbleIcon from "../assets/icons/speechbubble.png";
import Login from "./Login";
import Logout from "./Logout";
import supabase from "../../../supabase";
import Search from "./Search";
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

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
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

  return (
    <nav className="bg-[#151515] p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-white text-3xl font-bold flex-grow-0 mr-4">
          SQUAD FINDER
        </Link>
        <Search />
      </div>
      <div className="flex items-center">
        {session && (
          <Link to="/chat" className="mr-4">
            <img
              src={speechBubbleIcon}
              alt="Speech Bubble Icon"
              className="w-10 h-10"
            />
          </Link>
        )}
        {session && (
          <Link to="/profile" className="mr-4">
            <img
              src={userAvatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
          </Link>
        )}
        {session ? (
          <Logout onClick={() => setSession(null)} />
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="text-white hover:bg-[#444444] px-6 py-2 rounded"
          >
            Login
          </button>
        )}
        {showLoginModal && (
          <div
            onClick={() => setShowLoginModal(false)}
            className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-10"
          >
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Login />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
