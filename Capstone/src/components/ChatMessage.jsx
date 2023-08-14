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
	const [showModal, setShowModal] = useState(false); // State for the modal visibility
	const [loggedInUserData, setLoggedInUserData] = useState({}); // State for storing users data
	const [usersData, setUsersData] = useState([]);
	const [session, setSession] = useState(null);
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

	useEffect(() => {
		fetchChatData();
		fetchUsersData();
	}, [usersData]);

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

		if (!newMessage.trim()) {
			showEmptyMessageModal();
			return;
		}

		console.log("Sending new message...");

		try {
			const message = {
				senderID: loggedInUserData[0]?.id,
				content: newMessage,
				recievetime: new Date().toISOString(),
				sendtime: new Date().toISOString(),
			};

			console.log("Message to be sent:", message);

			const socket = new WebSocket("ws://localhost:3000");

			socket.onopen = () => {
				console.log("WebSocket connection opened.");
				socket.send(JSON.stringify(message));
				socket.close();
			};

			console.log("Logged in user data:", loggedInUserData[0]?.id);
			console.log("Users data:", usersData.id);

			const { data, error } = await supabase.from("chatmessages").insert([
				{
					sender_id: loggedInUserData[0]?.id,
					receiver_id: usersData.id,
					sender_gamertag: loggedInUserData[0]?.gamertag,
					receiver_gamertag: usersData.gamertag,
					message: newMessage,
					recievetime: new Date().toISOString(),
				},
			]);

			if (error) {
				console.error("Error inserting message:", error);
			} else {
				console.log("Inserted Message Data:", data);
			}
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	const fetchChatData = async () => {
		try {
			const { data, error } = await supabase
				.from("chatmessages")
				.select("*")
				.or(
					`sender_id.eq.${session.user.id},receiver_id.eq.${session.user.id}`
				);

			if (error) {
				console.error("Error fetching Chat Data:", error);
			} else {
				console.log("Fetched Chat Data:", data);
				setChatMessages(data);
			}
		} catch (error) {
			console.error("Error fetching Chat Data:", error);
		}
	};

	const fetchUsersData = async () => {
		try {
			const { data, error } = await supabase
				.from("profiles")
				.select("gamertag,id")
				.eq("id", session.user.id);
			console.log("fetch logged in user data", data);
			setLoggedInUserData(data);
		} catch (error) {
			console.error("Error fetching Users Data:", error);
		}
	};

	// if (chatMessages.length === 0) {
	// 	return <div>No Messages Found..</div>;
	// }

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
					<ChatUsers usersData={usersData} setUsersData={setUsersData} />
				</div>
				<div className='chat-messages'>
					<ul ref={inputRef}>
						{/* Add the ref here */}
						{chatMessages.map((chatMessage) => (
							<li key={chatMessage.id}>
								<p>Receiver: {chatMessage.receiver_gamertag}</p>
								<p>Sender: {chatMessage.sender_gamertag}</p>
								<p>Message: {chatMessage.message}</p>
								<p>Receive Time: {chatMessage.recievetime}</p>
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
