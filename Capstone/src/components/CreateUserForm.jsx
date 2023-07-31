/** @format */

import React, { useState } from "react";
import supabase from "../../../supabase";

const CreateUserForm = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		platform: "",
		gamertag: "",
		timezone: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async () => {
		console.log(formData);
		try {
			// Send a POST request to your backend route
			const { data, error } = await supabase.from("users").insert([
				{
					email: formData.email,
					password: formData.password,
					platform: formData.platform,
					gamertag: formData.gamertag,
					timezone: formData.timezone,
				},
			]);
			console.log(data);
			console.log(error);
			// Handle success, show a success message, or navigate to a different page
		} catch (error) {
			console.error("Error creating user:", error);
			// Handle error, show an error message, etc.
		}
	};

	return (
		<form>
			<label>Email:</label>
			<input
				type='email'
				name='email'
				value={formData.email}
				onChange={handleChange}
			/>

			<label>Password:</label>
			<input
				type='password'
				name='password'
				value={formData.password}
				onChange={handleChange}
			/>

			<label>Platform:</label>
			<input
				type='text'
				name='platform'
				value={formData.platform}
				onChange={handleChange}
			/>

			<label>Gamertag:</label>
			<input
				type='text'
				name='gamertag'
				value={formData.gamertag}
				onChange={handleChange}
			/>

			<label>Timezone:</label>
			<input
				type='text'
				name='timezone'
				value={formData.timezone}
				onChange={handleChange}
			/>

			<button type='button' onClick={handleSubmit}>
				Create User
			</button>
		</form>
	);
};

export default CreateUserForm;
