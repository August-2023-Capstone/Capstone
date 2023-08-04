/** @format */

import React from "react";
import "../ChatUsers.css";

function ChatUsers() {
	// Sample list of users (you can replace this with actual data from your database)
	const users = [
		{ id: 1, name: "John Doe", isActive: true },
		{ id: 2, name: "Jane Smith", isActive: false },
		{ id: 3, name: "Michael Johnson", isActive: false },
		{ id: 4, name: "Emily Williams", isActive: false },
		{ id: 5, name: "William Brown", isActive: false },
		{ id: 6, name: "Olivia Davis", isActive: false },
		{ id: 7, name: "James Miller", isActive: false },
		{ id: 8, name: "Sophia Wilson", isActive: false },
		{ id: 9, name: "Alexander Martinez", isActive: false },
		{ id: 10, name: "Isabella Anderson", isActive: false },
		{ id: 11, name: "Daniel Taylor", isActive: false },
		{ id: 12, name: "Ava Garcia", isActive: false },
		{ id: 13, name: "Ethan Lee", isActive: true },
		{ id: 14, name: "Mia Hernandez", isActive: false },
		{ id: 15, name: "Noah Wright", isActive: false },
		{ id: 16, name: "Abigail Thomas", isActive: false },
		{ id: 17, name: "Jameson White", isActive: false },
		{ id: 18, name: "Ella Martinez", isActive: false },
		{ id: 19, name: "Benjamin Robinson", isActive: false },
		{ id: 20, name: "Scarlett Lewis", isActive: false },
		{ id: 21, name: "Lucas Hall", isActive: false },
		{ id: 22, name: "Chloe Clark", isActive: false },
		{ id: 23, name: "Logan Walker", isActive: false },
		{ id: 24, name: "Grace Adams", isActive: false },
	];

	return (
		<div className='chat-users-container'>
			{users.map((user) => (
				<div
					key={user.id}
					className={`chat-user ${user.isActive ? "active-user" : ""}`}>
					<div className='user-avatar'>Avatar</div>
					<div className='user-name'>{user.name}</div>
				</div>
			))}
		</div>
	);
}

export default ChatUsers;
