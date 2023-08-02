/** @format */

import React, { useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatIcon from "../assets/icons/messageboxicon.png";

const ChatBox = () => {
	const [showChat, setShowChat] = useState(false);

	const toggleChat = () => {
		setShowChat((prevShowChat) => !prevShowChat);
	};

	return (
		<div className='Chat-Box-Popup'>
			{!showChat && (
				<button onClick={toggleChat}>
					<img className='Chat-Icon' src={ChatIcon} alt='Open Chat' />
				</button>
			)}

			{showChat && (
				<div className='chat-popup'>
					<div className='chat-content'>
						<ChatMessage toggleChat={toggleChat} />
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatBox;
