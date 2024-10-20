import React, { useContext, useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import "./index.css";
import { SocketContext } from "@/app/SocketContext";

const GlobalSearchFriends = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { isConnected, socket } = useContext(SocketContext);
  const { profileData } = useContext(SocketContext);

  const handleSearch = async () => {
    socket.emit("userList", {
      email: searchTerm,
      limit: 5,
    });
    setShowModal(true);
  };

  useEffect(() => {
    // Listening for the user list response
    socket.on("userListResponse", (users) => {
      console.log(users, "userssssss");
      if (Array.isArray(users)) {
        setUserList(users);
        // setError(null);
      } else {
        setUserList([]);
        // setError('Invalid data format received');
      }
    });

    // Listening for errors
    socket.on("userListError", (err) => {
      // setError(err.message);
      setUserList([]);
    });

    // Clean up the listener when the component unmounts
    return () => {
      socket.off("userListResponse");
      socket.off("userListError");
    };
  }, []);

  const handleSendRequest = (id) => {
    if (id) {
      socket.emit("sendFriendRequest", {
        userId: profileData?.id,
        friendId: id,
      });
    } else {
      alert("Please enter a friend ID.");
    }
  };

  return (
    <div className="global-search-friends">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a user..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>

      {/* Modal for search results */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Search Results</h2>
            {userList?.length > 0 ? (
              userList?.map((user) => (
                <div key={user.id} className="search-result-item">
                  <span>{user.email}</span>
                  <button
                    className="send-request-button"
                    onClick={() => handleSendRequest(user.id)}
                  >
                    <FaUserPlus className="send-request-icon" /> Send Request
                  </button>
                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}
            <button className="close-modal" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalSearchFriends;
