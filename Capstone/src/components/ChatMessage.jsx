/** @format */

import React, { useState, useEffect, useRef } from "react";
import supabaseConfig from "../../../supabase";
import "../MessageBox.css";
import ChatBox from "./ChatBox";
import CloseButton from "../assets/icons/closebutton.png";
import ChatUsers from "./ChatUsers";
import supabase from "../../../supabase";

function ChatMessage({ toggleChat }) {
	const [chatMessages, setChatMessages] = useState([]);
	const [showCloseButton, setShowCloseButton] = useState(true);
	const [newMessage, setNewMessage] = useState("");
	const { supabaseUrl, supabaseKey } = supabaseConfig;
	const [chatData, setChatData] = useState({
		message: "",
		receivetime: "",
		sender_username: "",
		receiver_username: "",
	});
	const inputRef = useRef(null); // Add this line to define the inputRef
	const scrolledToBottomRef = useRef(true); // Use true initially to scroll to bottom on first load
	const isScrollingRef = useRef(false); // Ref to track if the user is actively scrolling

	// Function to scroll to the bottom of the page on page load or component re-render
	useEffect(() => {
		scrollToBottomOnce(); // Call the function only once

		const handleScroll = () => {
			const chatContainer = inputRef.current;
			if (chatContainer) {
				const isScrolledToBottom =
					chatContainer.scrollTop + chatContainer.clientHeight ===
					chatContainer.scrollHeight;

				if (isScrolledToBottom) {
					scrolledToBottomRef.current = true; // Update scrolledToBottomRef when the user scrolls to the bottom
				} else {
					scrolledToBottomRef.current = false; // User is actively scrolling, set it to false
					isScrollingRef.current = true; // Set isScrollingRef to true when the user starts scrolling
				}
			}
		};

		setShowCloseButton(false);

		// Attach the scroll event listener to the chat container
		if (inputRef.current) {
			inputRef.current.addEventListener("scroll", handleScroll);
		}

		return () => {
			// Clean up the event listener on unmount
			if (inputRef.current) {
				inputRef.current.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

	useEffect(() => {
		// Scroll to the bottom when chatMessages state is updated
		if (!isScrollingRef.current) {
			scrollToBottom();
		}
	}, [chatMessages]);

	useEffect(() => {
		// If the user was actively scrolling and chat messages updated,
		// we need to scroll to bottom after a small delay to prevent
		// auto-scrolling down while the user is still scrolling up
		if (isScrollingRef.current) {
			setTimeout(() => {
				scrollToBottom();
				isScrollingRef.current = false; // Reset isScrollingRef after the delay
			}, 200);
		}
	}, [chatMessages]);

	// Move the scrollToBottom function outside the component
	const scrollToBottom = () => {
		if (inputRef.current) {
			inputRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	};

	// Function to scroll to the bottom of the chat container once
	const scrollToBottomOnce = () => {
		if (inputRef.current) {
			inputRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	};

	const [showModal, setShowModal] = useState(false); // State for the modal visibility
	const [usersData, setUsersData] = useState([]); // State for storing users data
	const [session, setSession] = useState(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			console.log(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			// 13 is the key code for the "Enter" key
			handleSendMessage(e);
		}
	};

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
			const currentUserID = usersData[0].id; // Replace with the actual ID or username

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
					sender_id: currentUserID,
					receiver_id: 2, // Replace with the ID of the receiver user
					sender_username: getUsernameById(currentUserID), // Use getUsernameById to get the sender username
					receiver_username: getUsernameById(2), // Use getUsernameById to get the receiver username
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
				scrollToInputField(); // Scroll to the input field after sending a new message
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

	// const fetchUsersData = async () => {
	// 	try {
	// 		const { data, error } = await supabase.from("users").select();
	// 		if (error) {
	// 			console.error("Error fetching Users Data:", error);
	// 		} else {
	// 			console.log("Fetched Users Data:", data);
	// 			setUsersData(data);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error fetching Users Data:", error);
	// 	}
	// };

	const fetchUsersData = async () => {
		try {
			const { data, error } = await supabase
				.from("profiles")
				.select("gamertag,id")
				.eq("id", session.user.id);
			console.log("fetch user profiles", data);
			setUsersData(data);
		} catch (error) {
			console.error("Error fetching Users Data:", error);
		}
	};

	// const fetchUserProfiles = async () => {
	// 	const { data, error } = await supabase
	// 		.from("profiles")
	// 		.select("gamertag,id")
	// 		.eq("id", session.user.id);
	// 	console.log("fetch user profiles", data);
	// };

	useEffect(() => {
		fetchChatData();
		fetchUsersData();
		// fetchUserProfiles();
	}, []);

	if (chatMessages.length === 0) {
		return <div>No Messages Found..</div>;
	}

	// Function to get username based on user ID
	const getUsernameById = (userId) => {
		const user = usersData.find((user) => user.id === userId);
		return user ? user.username : "Unknown User";
	};

	// Function to scroll to the input field
	const scrollToInputField = () => {
		if (inputRef.current) {
			inputRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	};

	return (
		<>
			<div className='chat-container'>
				<div className='chat-users'>
					<ChatUsers />
				</div>
				<div className='chat-messages'>
					<ul ref={inputRef}>
						{/* Add the ref here */}
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
			</div>
		</>
	);
}

export default ChatMessage;
