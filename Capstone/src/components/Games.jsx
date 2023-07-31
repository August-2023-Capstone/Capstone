/** @format */

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import supabaseConfig from "../../../supabase";

function Games() {
	const [games, setGames] = useState([]);
	const { supabaseUrl, supabaseKey } = supabaseConfig;

	const supabase = createClient(supabaseUrl, supabaseKey);

	useEffect(() => {
		const fetchGameData = async () => {
			const { data, error } = await supabase.from("games").select();
			console.log(data);
			console.log(error);

			if (error) {
				// Handle the error if needed
				console.error("Error fetching User data:", error);
			} else {
				setGames(data);
			}
		};

		fetchGameData();
	}, []);

	// Show a loading message or spinner while the data is being fetched
	if (games.length === 0) {
		return <div>No Games found try adding some...</div>;
	}

	return (
		<div>
			<h1>games:</h1>
			<ul>
				{games.map((game) => (
					<li key={game.id}>
						<p>Games: {games.name}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Games;
