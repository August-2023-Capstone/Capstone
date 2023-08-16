import React from "react";
import supabase from "../../supabase";

const TestSignOut = () => {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
      } else {
        console.log("User signed out successfully");
        // Optionally, you can redirect the user to a different page after successful sign-out.
        // Example: window.location.href = '/login';
      }
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default TestSignOut;
