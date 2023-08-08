/** @format */
import React, { useState, useEffect } from "react";
import HomeCarouselOne from "./HomeCarouselOne";
import ChatBox from "./ChatBox";
import Login from "./Login";

const HomePage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!session) {
        setShowLoginModal(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [session]);

  return (
    <div className="HomePage">
      <h2 className="NewReleases">New and trending</h2>
      <HomeCarouselOne />
      <h2 className="NewReleases">Recently released</h2>
      <HomeCarouselOne />
      <ChatBox />
      {showLoginModal && (
        <div
          onClick={() => setShowLoginModal(false)}
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-10"
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Login session={session} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
