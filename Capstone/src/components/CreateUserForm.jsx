/** @format */

import React, { useState } from "react";
import supabase from "../../../supabase";
import Css from "../app.css";

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

	const handleLogin = async () => {
		try {
			const { email, password } = formData;
			const supabase = createClient(
				supabaseConfig.supabaseUrl,
				supabaseConfig.supabaseKey
			);
			const { user, error } = await supabase.auth.signIn({ email, password });

			if (error) {
				console.error("Login error:", error.message);
				// Handle error, show an error message, etc.
			} else {
				console.log("Logged in user:", user);
				// Handle successful login, redirect to another page, etc.
			}
		} catch (error) {
			console.error("Login error:", error.message);
			// Handle error, show an error message, etc.
		}
	};

	const handleUpdateUser = async () => {
		try {
			const { data, error } = await supabase
				.from("users")
				.update({
					platform: formData.platform,
					gamertag: formData.gamertag,
					timezone: formData.timezone,
				})
				.match({ id: userId }); // Replace 'userId' with the unique identifier of the user you want to update

			if (error) {
				console.error("Error updating user data:", error);
				// Handle error, show an error message, etc.
			} else {
				console.log("User data updated successfully:", data);
				// Handle success, show a success message, or navigate to a different page
			}
		} catch (error) {
			console.error("Error updating user data:", error.message);
			// Handle error, show an error message, etc.
		}
	};

	const handleDeleteUser = async () => {
		try {
			const { data, error } = await supabase
				.from("users")
				.delete()
				.match({ id: userId }); // Replace 'userId' with the unique identifier of the user you want to delete

			if (error) {
				console.error("Error deleting user:", error);
				// Handle error, show an error message, etc.
			} else {
				console.log("User deleted successfully:", data);
				// Handle success, show a success message, or navigate to a different page
			}
		} catch (error) {
			console.error("Error deleting user:", error.message);
			// Handle error, show an error message, etc.
		}
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
			<div className='Input-field'>
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
			</div>

			<div className='button-container'>
				<button type='button' className='signup-button' onClick={handleSubmit}>
					Sign Up
				</button>
				<button type='button' className='login-button' onClick={handleLogin}>
					Login
				</button>
				{/* <button type='button' onClick={handleUpdateUser}>
			  Update User
			</button>
			<button type='button' onClick={handleDeleteUser}>
			  Delete User
			</button> */}
			</div>
		</form>
	);
};

export default CreateUserForm;
