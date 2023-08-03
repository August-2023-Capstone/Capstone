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
		recievetime: "",
		sender_username: "",
		receiver_username: "",
	});

	const supabase = createClient(supabaseUrl, supabaseKey);

	// WebSocket connection and message handling (same as previous example)
	console.log(chatMessages);
	const handleSendMessage = async (e) => {
		e.preventDefault();
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

	useEffect(() => {
		fetchChatData();
	}, []);

	if (chatMessages.length === 0) {
		return <div>No Messages Found..</div>;
	}

	return (
		<div className='chat-container'>
			<button className='chat-close' onClick={toggleChat}>
				<img className='Close-Icon' src={CloseButton} alt='Close Chat' />
			</button>
			<ul>
				{chatMessages.map((chatMessage) => (
					<li key={chatMessage.id}>
						<p>Reciever: {chatMessage.receiver_username}</p>
						<p>Sender: {chatMessage.sender_username}</p>
						<p>Message: {chatMessage.message}</p>
						<p>Receive Time: {chatMessage.recievetime}</p>
						<p>Send Time: {chatMessage.sendtime}</p>
					</li>
				))}
			</ul>
			<div>
				<input
					type='text'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder='Type your message...'
				/>
				<button type='button' onClick={handleSendMessage}>
					Send Message
				</button>
			</div>
		</div>
	);
}

export default ChatMessage;
