/** @format */

import React, { useState, useEffect, useRef } from "react";
import CSS from "../MessageBox.css";
import ChatBox from "./ChatBox";
import CloseButton from "../assets/icons/closebutton.png";
import ChatUsers from "./ChatUsers";
import supabase from "../../../supabase";

function ChatMessage({ toggleChat }) {
	const [chatMessages, setChatMessages] = useState([]);
	const [showCloseButton, setShowCloseButton] = useState(true);
	const [session, setSession] = useState(null);
	const [newMessage, setNewMessage] = useState("");
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
		console.log("Entering useEffect"); // Debugging line

		// Get initial session and set it in the state
		supabase.auth.getSession().then(({ data: { session } }) => {
			console.log("Setting initial session:", session); // Debugging line
			setSession(session);
			console.log(session);
		});

		// Set up subscription to listen for authentication state changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			console.log("Updating session:", session); // Debugging line
			setSession(session);
		});

		// Clean up the subscription when the component unmounts
		return () => {
			console.log("Unsubscribing from subscription"); // Debugging line
			subscription.unsubscribe(); // Unsubscribe from the authentication state changes
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
	const [profilesData, setProfilesData] = useState([]);

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
			const currentUserID = session.user.id; // Assuming this returns the UUID

			// Fetch sender and receiver gamertags
			const [senderGamertagResponse, receiverGamertagResponse] =
				await Promise.all([
					supabase
						.from("profiles")
						.select("gamertag")
						.eq("id", currentUserID)
						.single(),
					supabase.from("profiles").select("gamertag").eq("id", 2).single(), // Replace with the ID of the receiver user
				]);

			if (!senderGamertagResponse.error && !receiverGamertagResponse.error) {
				const senderGamertag = senderGamertagResponse.data
					? senderGamertagResponse.data.gamertag
					: "Unknown Sender Gamertag";
				const receiverGamertag = receiverGamertagResponse.data
					? receiverGamertagResponse.data.gamertag
					: "Unknown Receiver Gamertag";

				// Send the new message to the WebSocket server
				const message = {
					senderID: currentUserID,
					content: newMessage,
					senderGamertag: senderGamertag,
					receiverGamertag: receiverGamertag,
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
						sender_gamertag: senderGamertag,
						receiver_gamertag: receiverGamertag,
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
				// Fetch gamertags for sender and receiver and merge them into chatMessages data
				const updatedChatMessages = await Promise.all(
					data.map(async (chatMessage) => {
						const senderProfile = profilesData.find(
							(profile) => profile.id === chatMessage.sender_id
						);
						const receiverProfile = profilesData.find(
							(profile) => profile.id === chatMessage.receiver_id
						);

						if (senderProfile && receiverProfile) {
							// Fetch the gamertags from the profiles table based on sender and receiver UUIDs
							const senderGamertagResponse = await supabase
								.from("profiles")
								.select("gamertag")
								.eq("id", chatMessage.sender_id)
								.single();
							const receiverGamertagResponse = await supabase
								.from("profiles")
								.select("gamertag")
								.eq("id", chatMessage.receiver_id)
								.single();

							if (
								!senderGamertagResponse.error &&
								!receiverGamertagResponse.error
							) {
								return {
									...chatMessage,
									sender_gamertag: senderGamertagResponse.data
										? senderGamertagResponse.data.gamertag
										: "Unknown Sender Gamertag",
									receiver_gamertag: receiverGamertagResponse.data
										? receiverGamertagResponse.data.gamertag
										: "Unknown Receiver Gamertag",
								};
							}
						}

						return chatMessage;
					})
				);

				setChatMessages(updatedChatMessages);
			}
		} catch (error) {
			console.error("Error fetching Chat Data:", error);
		}
	};

	const fetchUsersData = async () => {
		try {
			const { data, error } = await supabase.from("users").select(); // Replace "users" with the actual table name
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

	const fetchProfileData = async () => {
		try {
			const userId = "8f692d6b-ad89-401c-aac3-bb6cf2eb10e3"; // Replace with the correct UUID value
			const { data, error } = await supabase
				.from("profiles")
				.select("gamertag")
				.eq("id", userId)
				.single();
			if (error) {
				console.error("Error fetching profiles Data:", error);
			} else {
				console.log("Fetched profiles Data:", data);
				setProfilesData([data]); // Note the use of an array to match your usage in fetchChatData
			}
		} catch (error) {
			console.error("Error fetching profiles Data:", error);
		}
	};

	useEffect(() => {
		fetchChatData();
		fetchProfileData();
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

	// Function to scroll to the input field
	const scrollToInputField = () => {
		if (inputRef.current) {
			inputRef.current.scrollIntoView({ behavior: "smooth", block: "bottom" });
		}
	};

	// ...

	return (
		<div className='chat-container'>
			<div className='chat-users'>
				<ChatUsers />
			</div>
			<div className='chat-messages'>
				<ul ref={inputRef}>
					{chatMessages.map((chatMessage) => (
						<li
							key={chatMessage.id}
							className={
								chatMessage.sender_id === (session?.user?.id || null)
									? "sender-message"
									: "receiver-message"
							}>
							<p>
								{chatMessage.sender_id === (session?.user?.id || null)
									? `Sender: You`
									: `Sender: ${
											getUsernameById(chatMessage.sender_id) || "Loading..."
									  }`}
								{chatMessage.sender_id !== (session?.user?.id || null) &&
									chatMessage.sender_gamertag && (
										<> (Gamertag: {chatMessage.sender_gamertag})</>
									)}
							</p>
							<p>
								{chatMessage.receiver_id === (session?.user?.id || null)
									? "Receiver: You"
									: `Receiver: ${
											getUsernameById(chatMessage.receiver_id) || "Loading..."
									  }`}
							</p>
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
							onKeyDown={handleKeyDown}
							placeholder='Type your message...'
						/>
						<button type='button' onClick={handleSendMessage}>
							Send Message
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChatMessage;
