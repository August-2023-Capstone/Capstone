/** @format */

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import supabaseConfig from "../../../supabase";
import CSS from "../app.css";
import ChatBox from "./ChatBox";
import CloseButton from "../assets/icons/closebutton.png";

function ChatMessage({ toggleChat }) {
	const [chatMessages, setChatMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const { supabaseUrl, supabaseKey } = supabaseConfig;
	const [chatData, setChatData] = useState({
		message: "",
		receivetime: "",
		sender_username: "",
		receiver_username: "",
	});
	const [showModal, setShowModal] = useState(false); // State for the modal visibility
	const [usersData, setUsersData] = useState([]); // State for storing users data

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			// 13 is the key code for the "Enter" key
			handleSendMessage(e);
		}
	};

	const supabase = createClient(supabaseUrl, supabaseKey);

	const showEmptyMessageModal = () => {
		setShowModal(true);
		setTimeout(() => {
			setShowModal(false);
		}, 2000); // Modal will fade away after 2 seconds (adjust the duration as needed)
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		// Check if the newMessage is empty or only contains whitespace
		if (!newMessage.trim()) {
			showEmptyMessageModal(); // Show the modal for empty message
			return;
		}
		try {
			// Get the current user ID or username from your authentication system
			const currentUserID = 1; // Replace with the actual ID or username

			// Send the new message to the WebSocket server
			const message = {
				senderID: currentUserID,
				content: newMessage,
				recievetime: new Date().toISOString(),
				sendtime: new Date().toISOString(),
			};
			const socket = new WebSocket("ws://localhost:3000");
			socket.onopen = () => {
				socket.send(JSON.stringify(message));
				socket.close();
			};

			// Insert the new message into the chatmessages table
			const { data, error } = await supabase.from("chatmessages").insert([
				{
					sender_id: 1, // Replace with the actual ID or username
					receiver_id: 2, // Replace with the ID of the receiver user
					sender_username: chatData.sender_username,
					receiver_username: chatData.receiver_username,
					message: newMessage,
					recievetime: new Date().toISOString(),
					sendtime: new Date().toISOString(),
				},
			]);
			console.log(data);

			if (error) {
				console.error("Error sending message:", error);
			} else {
				console.log("Message sent successfully:", data);
				setNewMessage(""); // Clear the input field after sending the message
				fetchChatData(); // Refresh the chat messages after sending a new message
			}
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	const fetchChatData = async () => {
		try {
			const { data, error } = await supabase.from("chatmessages").select();
			if (error) {
				console.error("Error fetching Chat Data:", error);
			} else {
				console.log("Fetched Chat Data:", data); // Add this log to check the data
				setChatMessages(data);
			}
		} catch (error) {
			console.error("Error fetching Chat Data:", error);
		}
	};

	const fetchUsersData = async () => {
		try {
			const { data, error } = await supabase.from("users").select();
			if (error) {
				console.error("Error fetching Users Data:", error);
			} else {
				console.log("Fetched Users Data:", data);
				setUsersData(data);
			}
		} catch (error) {
			console.error("Error fetching Users Data:", error);
		}
	};

	useEffect(() => {
		fetchChatData();
		fetchUsersData(); // Fetch users data on mount
	}, []);

	if (chatMessages.length === 0) {
		return <div>No Messages Found..</div>;
	}

	// Function to get username based on user ID
	const getUsernameById = (userId) => {
		const user = usersData.find((user) => user.id === userId);
		return user ? user.username : "Unknown User";
	};

	return (
		<div className='chat-container'>
			<button className='chat-close' onClick={toggleChat}>
				<img className='Close-Icon' src={CloseButton} alt='Close Chat' />
			</button>
			<ul>
				{chatMessages.map((chatMessage) => (
					<li
						key={chatMessage.id}
						className={
							chatMessage.sender_id === 1
								? "sender-message"
								: "receiver-message"
						}>
						<p>Receiver: {getUsernameById(chatMessage.receiver_id)}</p>
						<p>Sender: {getUsernameById(chatMessage.sender_id)}</p>
						<p>Message: {chatMessage.message}</p>
						<p>Receive Time: {chatMessage.recievetime}</p>
						<p>Send Time: {chatMessage.sendtime}</p>
					</li>
				))}
			</ul>
			<div>
				{showModal && <div className='modal'>Please enter a message!</div>}
				<div>
					<input
						type='text'
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						onKeyDown={handleKeyDown} // Add the onKeyDown event listener
						placeholder='Type your message...'
					/>
					<button type='button' onClick={handleSendMessage}>
						Send Message
					</button>
				</div>
			</div>
		</div>
	);
}

export default ChatMessage;
