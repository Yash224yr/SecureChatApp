const socket = io('http://localhost:3000'); // or your actual server URL

// Send a message via Socket.IO
socket.emit("sendMessage", {
    phoneNumber: "1234567890", // Optional
    email: "user@example.com",
    messageContent: "Hello, this is a test message!"
});

// Listen for success response
socket.on("message_success", (data) => {
    console.log("Message sent successfully:", data);
});

// Listen for error response
socket.on("message_error", (error) => {
    console.error("Error sending message:", error);
});
