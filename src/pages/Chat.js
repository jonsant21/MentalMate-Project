import React, { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";

function Chat() {
  const [input, setInput] = useState(""); // User input state
  const [messages, setMessages] = useState([]); // Message state
  const [loading, setLoading] = useState(false); // Track API request status

  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Auto-scroll to the latest message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty messages

    // Add user message to chat and clear input immediately
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true); // Disable input while waiting

    try {
      const response = await fetch("http://localhost:8081/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      // Add assistant response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }

    setLoading(false); // Re-enable input
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Chat with MentalMate</h1>
      <div className="chat-container">
        {/* Chat messages section */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Auto-scroll to new messages */}
        </div>

        {/* Input field and send button */}
        <form onSubmit={handleSubmit} className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading} // Disable when waiting
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;