import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import "./ChatBoltPage.css";

function ChatBoltPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // for typing indicator
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    // Show "typing..." message
    setMessages((prev) => [...prev, { sender: "bot", text: "🤖 ChatBot is typing..." }]);

    try {
      const response = await fetch("http://localhost:8000/ask-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) throw new Error("Chat API failed");

      const data = await response.json();

      // Replace the last "typing..." message with the actual bot reply
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          sender: "bot",
          text: data.reply || "🤖 Sorry, I couldn't understand that.",
        };
        return newMessages;
      });

    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          sender: "bot",
          text: "❌ Error: Failed to connect to chatbot API",
        };
        return newMessages;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbolt-fullscreen">
      {/* Header */}
      <header className="chatbolt-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h1>
          Skill Lens ChatBot <span className="emoji">💬🤖</span>
        </h1>
      </header>

      {/* Chat Section */}
      <div className="chatbolt-chat">
        {messages.length === 0 ? (
          <div className="welcome-text">
            👋 Hey there! I'm <b>ChatBot</b>, your placement assistant.
            Ask me about <b>skills, interviews,</b> or <b>career guidance 🎯</b>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
            >
              {msg.text}
            </div>
          ))
        )}
      </div>

      {/* Input Bar */}
      <footer className="chatbolt-footer">
        <input
          type="text"
          placeholder="💭 Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()} />
        <button className="mic-btn" title="Voice Input 🎙️">
          <FaMicrophone />
        </button>
        <button className="send-btn" title="Send Message ✈️" onClick={handleSend}>
          <FaPaperPlane />
        </button>
      </footer>
    </div>
  );
}

export default ChatBoltPage;
