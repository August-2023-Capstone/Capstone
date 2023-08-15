import React, { useState, useEffect } from "react";
import HomeCarouselOne from "./HomeCarouselOne";
import HomeCarouselTwo from "./HomeCarouselTwo";
import HomeCarouselThree from "./HomeCarouselThree";
import supabase from "../../../supabase";
import ChatBox from "./ChatBox";
import Login from "./Login";

const HomePage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check if there's an existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to auth state changes
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
    if (!session) {
      const timer = setTimeout(() => {
        setShowLoginModal(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [session]);

  return (
    <div className="HomePage">
      <div className="HomeContainer">
        <h2 className="HomepageHeader">NEW AND TRENDING</h2>
        <HomeCarouselOne />
        <h2 className="HomepageHeader">TOP RATED</h2>
        <HomeCarouselTwo />
        <h2 className="HomepageHeader">RECENTLY RELEASED</h2>
        <HomeCarouselThree />
      </div>
      <ChatBox />
      {showLoginModal && !session && (
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
  );
};

export default HomePage;
