/** @format */

import React, { useState, useEffect, useRef } from "react";
import supabaseConfig from "../../supabase";
import "../MessageBox.css";
import ChatBox from "./ChatBox";
import CloseButton from "../assets/icons/closebutton.png";
import ChatUsers from "./ChatUsers";
import supabase from "../../supabase";

function ChatMessage({ toggleChat }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for the modal visibility
  const [loggedInUserData, setLoggedInUserData] = useState({}); // State for storing users data
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [friendIds, setFriendIds] = useState([]);
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
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const message = {
        sender_id: loggedInUserData[0]?.id,
        receiver_id: usersData.id,
        sender_gamertag: loggedInUserData[0]?.gamertag,
        receiver_gamertag: usersData.gamertag,
        message: newMessage,
        recievetime: formattedTime,
      };

      console.log("Message to be sent:", message);

      const socket = new WebSocket("wss://gamernet.netlify.app/");

      socket.onopen = () => {
        console.log("WebSocket connection opened.");
        socket.send(JSON.stringify(message));
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed.");
      };

      console.log("Logged in user data:", loggedInUserData[0]?.id);
      console.log("Users data:", usersData.id);

      const { data, error } = await supabase
        .from("chatmessages")
        .insert([message]);

      if (error) {
        console.error("Error inserting message:", error);
      } else {
        console.log("Inserted Message Data:", data);
        // Update chatMessages state with the new message
        setChatMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage(""); // Clear the input field
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Establish WebSocket connection for receiving messages
  const receiveSocket = new WebSocket("wss://gamernet.netlify.app/");

  receiveSocket.onmessage = (event) => {
    const receivedMessage = JSON.parse(event.data);
    console.log("Received message:", receivedMessage);

    // Update chatMessages state with the received message
    setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  receiveSocket.onclose = () => {
    console.log("WebSocket connection for receiving messages closed.");
  };

  const fetchChatData = async () => {
    try {
      const { data, error } = await supabase
        .from("chatmessages")
        .select("*")
        .in("sender_id", [session.user.id, usersData.id])
        .in("receiver_id", [session.user.id, usersData.id]);

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

  useEffect(() => {
    // Fetch the logged-in user's ID
    const fetchLoggedInUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setLoggedInUserId(user.id);
    };

    fetchLoggedInUserId();
  }, []);

  useEffect(() => {
    const fetchFriendAndUserIds = async () => {
      try {
        const { data: friendData, error: friendError } = await supabase
          .from("friends")
          .select("friend_id")
          .eq("user_id", loggedInUserId);

        if (friendError) {
          console.error("Error fetching friend IDs:", friendError);
          return;
        }

        const { data: userData, error: userError } = await supabase
          .from("friends")
          .select("user_id")
          .eq("friend_id", loggedInUserId);

        if (userError) {
          console.error("Error fetching user IDs:", userError);
          return;
        }

        const combinedIds = [
          ...friendData.map((friend) => friend.friend_id),
          ...userData.map((user) => user.user_id),
        ];

        setFriendIds(combinedIds);

        // Code to run after both fetch operations are complete
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (loggedInUserId) {
      fetchFriendAndUserIds();
    }
  }, [loggedInUserId]);

  // console.log("Friend IDs with status true:", friendIds);

  // Function to scroll to the input field
  const scrollToInputField = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-users">
          <ChatUsers
            usersData={usersData}
            setUsersData={setUsersData}
            friendIds={friendIds}
            setFriendIds={setFriendIds}
            setChatMessages={setChatMessages}
            chatMessages={chatMessages}
          />
        </div>
        <div className="chat-messages">
          <ul ref={inputRef}>
            {/* Add the ref here */}
            {chatMessages.map((chatMessage) => (
              <li
                key={chatMessage.id}
                className={`Chat-bubbles ${
                  chatMessage.sender_gamertag === loggedInUserData[0]?.gamertag
                    ? "sender-bubble"
                    : "receiver-bubble"
                }`}
              >
                <p> Reciever:{chatMessage.receiver_gamertag}</p>
                <p>Sender: {chatMessage.sender_gamertag}</p>
                <p>{chatMessage.message}</p>
                <p>Receive Time: {chatMessage.recievetime}</p>
              </li>
            ))}
          </ul>

          <div>
            {showModal && <div className="modal">Please enter a message!</div>}
            <div className="input-container">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="message-input"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                className="send-button"
              >
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
