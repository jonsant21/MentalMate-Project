import React, { useState } from "react";
import '../styles/Chat.css';


function Chat() {
  const [input, setInput] = useState(""); // User input state
  const [messages, setMessages] = useState([]); // Message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Don't send empty messages

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // Send message to backend (chat API)
    try {
      const response = await fetch("http://localhost:8081/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }), // Send user input
      });
      const data = await response.json();

      // Add assistant response to chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }

    // Reset input field after message is sent
    setInput("");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Chat with MentalMate</h1>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.role}`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
