import React, { useState, useEffect } from "react";
import supabase from "../../supabase";

const AcceptDeclineButtons = ({ friendId, loggedInUserId }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [friendRequestStatus, setFriendRequestStatus] = useState(false);

  useEffect(() => {
    const fetchFriendRequestStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("friends")
          .select("status")
          .eq("user_id", friendId)
          .eq("friend_id", loggedInUserId);

        if (error) {
          console.error("Error fetching friend request status:", error);
          return;
        }

        if (data.length > 0) {
          setFriendRequestStatus(data[0].status);
          setShowButtons(!data[0].status); // Show buttons only if status is false
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFriendRequestStatus();
  }, [friendId, loggedInUserId]);

  const handleAcceptFriend = async () => {
    try {
      // Update friend request status to true
      await supabase
        .from("friends")
        .upsert(
          { user_id: friendId, friend_id: loggedInUserId, status: true },
          { onConflict: ["user_id", "friend_id"] }
        );

      setFriendRequestStatus(true);
      setShowButtons(false); // Hide buttons after accepting
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDeclineFriend = async () => {
    try {
      // Delete the friend request row
      await supabase
        .from("friends")
        .delete()
        .eq("user_id", friendId)
        .eq("friend_id", loggedInUserId);

      setShowButtons(false); // Hide buttons after declining
    } catch (error) {
      console.error("Error declining friend request:", error);
    }
  };

  if (showButtons) {
    return (
      <div className="flex space-x-2">
        <button
          className="bg-green-500 text-white px-2 py-1 rounded"
          onClick={handleAcceptFriend}
        >
          Accept
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={handleDeclineFriend}
        >
          Decline
        </button>
      </div>
    );
  }

  return null;
};

export default AcceptDeclineButtons;
