/** @format */

// ChatBox.js
import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatIcon from "../assets/icons/messageboxicon.png";
import CSS from "./ChatBox.css";

const ChatBox = () => {
	const [showChat, setShowChat] = useState(false);

	// Toggle the chat pop-up visibility
	const toggleChat = () => {
		setShowChat((prevShowChat) => !prevShowChat);
	};

	return (
		<>
			{/* Chat pop-up */}
			{showChat && (
				<div className='chat-popup'>
					<button onClick={toggleChat}>
						<img className='Chat-Icon' src={ChatIcon} alt='Open Chat' />
					</button>
					<div className='chat-content'>
						{/* Close button to hide the chat pop-up */}
						<button onClick={toggleChat}>Close</button>
						<ChatMessage toggleChat={toggleChat} />
						{/* Add more chat content here */}
					</div>
				</div>
			)}

			{/* Show the chat icon only when the chat is not open */}
			{!showChat && (
				<div className='Chat-Box-Popup'>
					<button onClick={toggleChat}>
						<img className='Chat-Icon' src={ChatIcon} alt='Open Chat' />
					</button>
				</div>
			)}
		</>
	);
};

export default ChatBox;
