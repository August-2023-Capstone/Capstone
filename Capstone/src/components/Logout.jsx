import React from "react";
import supabase from "../../supabase";

const Logout = () => {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
      } else {
        console.log("User signed out successfully");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-white hover:bg-[#444444] px-6 py-2 rounded"
    >
      Sign Out
    </button>
  );
};

export default Logout;
