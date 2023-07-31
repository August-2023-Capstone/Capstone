/** @format */

const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const supabaseConfig = require("../../../supabase"); // Adjust the path to your supabase config file

const router = express.Router();

// Create a Supabase client using the config
const { supabaseUrl, supabaseKey } = supabaseConfig;
const supabase = createClient(supabaseUrl, supabaseKey);

// Define the route for creating a new user
router.post("/create-user", async (req, res) => {
	const { email, password, platform, gamertag, timezone } = req.body;

	try {
		const { data, error } = await supabase.from("users").insert([
			{
				email,
				password,
				platform,
				gamertag,
				timezone,
			},
		]);

		if (error) {
			console.error("Error creating user:", error);
			return res.status(500).json({ error: "Failed to create user" });
		}

		// User creation successful
		return res
			.status(201)
			.json({ message: "User created successfully", user: data[0] });
	} catch (error) {
		console.error("Error creating user:", error);
		return res.status(500).json({ error: "Failed to create user" });
	}
});

module.exports = router;
