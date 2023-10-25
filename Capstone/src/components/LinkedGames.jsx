/** @format */

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import supabaseConfig from "../../supabase";

function LinkedGames() {
  const [linkedGames, setLinkedGames] = useState([]);
  const { supabaseUrl, supabaseKey } = supabaseConfig;

  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const fetchLinkedGameData = async () => {
      const { data, error } = await supabase.from("games").select();

      if (error) {
        // Handle the error if needed
        console.error("Error fetching User data:", error);
      } else {
        setLinkedGames(data);
      }
    };

    fetchLinkedGameData();
  }, []);

  // Show a loading message or spinner while the data is being fetched
  if (linkedGames.length === 0) {
    return <div>No Games Linked with this profile...</div>;
  }

  return (
    <div>
      <h1>games:</h1>
      <ul>
        {linkedGames.map((linkedGame) => (
          <li key={linkedGame.id}>
            <p>Your Games: {linkedGame.userid}</p>
            <p> {linkedGame.gameid}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LinkedGames;
