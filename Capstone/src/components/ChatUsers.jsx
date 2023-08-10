/** @format */
import { React, useState, useEffect, useRef } from "react";
import supabase from "../../../supabase";
import "../ChatUsers.css";

function ChatUsers({ usersData, setUsersData }) {
	// Sample list of users (you can replace this with actual data from your database)

	const [profileData, setProfileData] = useState([]);

	const fetchProfileData = async () => {
		const { data, error } = await supabase.from("profiles").select("*");
		console.log("fetch user profiles", data);
		setProfileData(data);
	};

	useEffect(() => {
		fetchProfileData();
	}, []);

	return (
		<div className='chat-users-container'>
			{profileData.map((user) => (
				<div
					onClick={() => setUsersData(user)}
					key={user.id}
					className={`chat-user hover:cursor-pointer ${
						user.isActive ? "active-user" : ""
					}`}>
					<div className='user-avatar'>Avatar</div>
					<div className='user-name'>{user.gamertag}</div>
				</div>
			))}
		</div>
	);
}

export default ChatUsers;
