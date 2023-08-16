import React, { useState, useEffect } from "react";
import HomeCarouselOne from "./HomeCarouselOne";
import HomeCarouselTwo from "./HomeCarouselTwo";
import HomeCarouselThree from "./HomeCarouselThree";
import supabase from "../../supabase";
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
    </div>
  );
};

export default HomePage;
