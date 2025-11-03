import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMicrophone, FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import "./ChatBoltPage.css";

const ChatBoltPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "🤖 Got it! Let’s talk about placements, skills, or interview prep 🚀",
          },
        ]);
      }, 1000);
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
          SkillLens ChatBolt <span className="emoji">💬🤖</span>
        </h1>
      </header>

      {/* Chat Section */}
      <div className="chatbolt-chat">
        {messages.length === 0 ? (
          <div className="welcome-text">
            👋 Hey there! I'm <b>ChatBolt</b>, your placement assistant.  
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
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="mic-btn" title="Voice Input 🎙️">
          <FaMicrophone />
        </button>
        <button className="send-btn" title="Send Message ✈️" onClick={handleSend}>
          <FaPaperPlane />
        </button>
      </footer>
    </div>
  );
};

export default ChatBoltPage;
