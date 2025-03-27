import React, { useState, useEffect, useRef } from "react";
import "../styles/Chat.css";

// Set up SpeechRecognition 
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

function Chat() {
  const [input, setInput] = useState(""); // User input state
  const [messages, setMessages] = useState([]); // Message state
  const [loading, setLoading] = useState(false); // Track API request status

  const [context, setContext] = useState([]); // To store the conversation context, make sure it is empty at first
  const [voiceMode, setVoiceMode] = useState(false); // Toggle voice mode
  const [listening, setListening] = useState(false); // Speech recognition state


  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Auto-scroll to the latest message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Configure speech recognition if supported and start it
  const startVoiceRecognition = () => {
    if (recognition) {
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.start();
      setListening(true);
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  // Function to stop voice recognition mode
  const stopVoiceRecognition = () => {
    if (recognition && listening) {
      recognition.stop(); 
      setListening(false);
    }
  };

  if (recognition) {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
      // Automatically send the recognized text as a message
      handleVoiceSubmit(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent empty messages

    // Add user message to chat and clear input immediately
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    const userInput = input; // capture input for sending

    setInput("");
    setLoading(true); // Disable input while waiting

    try {
      // Send the context with the current message to the backend
      const response = await fetch("http://localhost:8081/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userInput,
          context: context, // Send the conversation context to the backend
        }),

      });
      const data = await response.json();

      // Add assistant response to chat

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);

      // Update context with the new message and assistant reply
      setContext(data.context); // Store the updated context returned by the API
      
      // If in voice mode, speak the assistant's reply using OpenAI TTS 
      if (voiceMode) {
        playTTSResponse(data.reply);
      }


    } catch (error) {
      console.error("Error fetching OpenAI response:", error);
    }

    setLoading(false); // Re-enable input
  };

  // Handle voice mode messages
  const handleVoiceSubmit = (transcript) => {
    if (!transcript.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: transcript }]);
    setLoading(true);

    fetch("http://localhost:8081/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: transcript,
        context: context,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
        setContext(data.context);

        if (voiceMode) {
          playTTSResponse(data.reply);
        }
      })
      .catch((error) => {
        console.error("Error fetching voice response:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Function to fetch and play TTS response
  const playTTSResponse = async (text) => {
    try {
      const response = await fetch("http://localhost:8081/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Further refined voiced response via settings
        body: JSON.stringify({
          text: text,
          voice: "alloy",
          voice_settings: {
            affect: "calm, composed, and reassuring",
            tone: "sincere, empathetic, and understanding",
            pace: "moderate, with pauses for clarity",
            pronunciation: "clear and precise",
            pauses: "before and after key phrases",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch TTS audio");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      // When TTS playback ends restart voice recognition if voice mode is active
      audio.onended = () => {
        if (voiceMode) {
          startVoiceRecognition();
        }
      };
    } catch (error) {
      console.error("Error playing TTS audio:", error);
    }
  };

  // Allow key press on textarea for Enter to submit (without shift)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Cleaning up for toggling between voice and text mode
  const toggleVoiceMode = () => {
    if (voiceMode) {
      // Switching from voice to text mode: clear input and stop recognition
      setInput("");
      if (listening) {
        stopVoiceRecognition();
      }
      setVoiceMode(false);
    } else {
      setVoiceMode(true);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Chat with MentalMate</h1>
      <div className="chat-container">
        {/* Conversation messages */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.role}`}>
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>


        {voiceMode ? (
          <>
            {/* Voice mode: show record/stop button and a separate switch to text mode */}
            <div style={{ marginBottom: "10px" }}>
              <button
                onClick={() => {
                  listening ? stopVoiceRecognition() : startVoiceRecognition();
                }}
                disabled={loading}
              >
                {listening ? "Stop Recording" : "Record Message"}
              </button>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <button onClick={toggleVoiceMode}>Switch to Text Mode</button>
            </div>
          </>
        ) : (
          <>
            {/* Text mode: show input form with inline send & voice toggle buttons */}
            <form onSubmit={handleSubmit} className="chat-input">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="chat-textarea"
                disabled={loading}
              />
              <div className="chat-button-row">
                <button type="submit" className="send-btn" disabled={loading}>
                  {loading ? "Sending..." : "Send"}
                </button>
                <button
                  type="button"
                  className="voice-toggle-btn"
                  onClick={toggleVoiceMode}
                >
                  Voice Mode
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

export default Chat;