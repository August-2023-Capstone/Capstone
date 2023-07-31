/** @format */

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import supabaseConfig from "../../../supabase";

function ChatMessage() {
	const [ChatMessages, setChatMessage] = useState([]);
	const { supabaseUrl, supabaseKey } = supabaseConfig;

	const supabase = createClient(supabaseUrl, supabaseKey);
	useEffect(() => {
		const fetchUserFriendData = async () => {
			const { data, error } = await supabase.from("ChatMessages").select();
			console.log(data);
			console.log(error);

			if (error) {
				// Handle the error if needed
				console.error("Error fetching Chat Data:", error);
			} else {
				setChatMessage(data);
			}
		};

		fetchUserFriendData();
	}, []);

	if (ChatMessages.length === 0) {
		return <div>No Messages Found..</div>;
	}

	return (
		<div>
			<h1>Messages:</h1>
			<ul>
				{ChatMessages.map((ChatMessage) => (
					<li key={ChatMessage.id}>
						<p>Message ID: {ChatMessage.messageID}</p>
						<p>Sender ID: {ChatMessage.senderID}</p>
						<p>Message: {ChatMessage.content}</p>
						<p>Rseceive time: {ChatMessage.recievetime}</p>
						<p>Send Time: {ChatMessage.sendtime}</p>
					</li>
				))}
			</ul>
		</div>
	);
}

export default ChatMessage;
