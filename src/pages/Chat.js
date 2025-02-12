import React, { useState } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat history
    setChatHistory((prev) => [...prev, { role: 'user', content: message }]);

    // Send message to backend
    try {
      const response = await fetch('http://localhost:8081/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setChatHistory((prev) => [...prev, { role: 'bot', content: data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    // Clear input
    setMessage('');
  };

  return (
    <div className="chat-page">
      <h1>Mental Health Chatbot</h1>
      <div className="chat-window">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.role === 'user' ? 'user' : 'bot'}`}>
            <strong>{chat.role === 'user' ? 'You' : 'Bot'}:</strong> {chat.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;