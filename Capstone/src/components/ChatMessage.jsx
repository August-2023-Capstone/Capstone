/** @format */

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import supabaseConfig from "../../../supabase";

function ChatMessage() {
	const [chatMessages, setChatMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const { supabaseUrl, supabaseKey } = supabaseConfig;

	const supabase = createClient(supabaseUrl, supabaseKey);

	useEffect(() => {
		fetchChatData();
	}, []);

	const fetchChatData = async () => {
		try {
			const { data, error } = await supabase.from("ChatMessages").select();
			if (error) {
				console.error("Error fetching Chat Data:", error);
			} else {
				setChatMessages(data);
			}
		} catch (error) {
			console.error("Error fetching Chat Data:", error);
		}
	};

	const handleSendMessage = async (e) => {
		e.preventDefault();
		try {
			// Get the current user ID or username from your authentication system
			const currentUserID = 1; // Replace with the actual ID or username
			const { data, error } = await supabase.from("ChatMessages").insert([
				{
					senderID: currentUserID,
					content: newMessage,
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

	if (chatMessages.length === 0) {
		return <div>No Messages Found..</div>;
	}

	return (
		<div>
			<h1>Messages:</h1>
			<ul>
				{chatMessages.map((chatMessage) => (
					<li key={chatMessage.id}>
						<p>Message ID: {chatMessage.messageID}</p>
						<p>Sender ID: {chatMessage.senderID}</p>
						<p>Message: {chatMessage.content}</p>
						<p>Receive Time: {chatMessage.recievetime}</p>
						<p>Send Time: {chatMessage.sendtime}</p>
					</li>
				))}
			</ul>
			<form onSubmit={handleSendMessage}>
				<input
					type='text'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder='Type your message...'
				/>
				<button type='submit'>Send</button>
			</form>
		</div>
	);
}

export default ChatMessage;
