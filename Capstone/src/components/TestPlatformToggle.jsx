import React from "react";
import supabase from "../../supabase";

const TestPlatformToggle = () => {
  // Replace with the actual user UUID

  const togglePlatform = async (platform) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userId = user.id;

    // Fetch the current platform value
    const { data, error } = await supabase
      .from("profiles")
      .select(platform)
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching platform data:", error);
      return;
    }

    // Toggle the platform value
    const updatedValue = !data[platform];
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ [platform]: updatedValue })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating platform value:", updateError);
    } else {
      console.log("Platform value updated successfully");
    }
  };

  return (
    <div>
      <button type="button" onClick={() => togglePlatform("playstation")}>
        Toggle Playstation
      </button>
      <button type="button" onClick={() => togglePlatform("xbox")}>
        Toggle Xbox
      </button>
      <button type="button" onClick={() => togglePlatform("switch")}>
        Toggle Switch
      </button>
      <button type="button" onClick={() => togglePlatform("pc")}>
        Toggle PC
      </button>
    </div>
  );
};

export default TestPlatformToggle;
