// components/ChatbotUI.js
import { useState } from 'react';

const ChatbotUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchChatGPTResponse = async (message) => {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      setMessages((msgs) => [...msgs, { id: msgs.length, text: data.answer, sender: 'bot' }]);
    } else {
      // Handle error
      console.error('API request failed');
    }
  };

  const sendMessage = (message) => {
    setMessages([...messages, { id: messages.length, text: message, sender: 'user' }]);
    fetchChatGPTResponse(message);
    setInputValue(''); // Clear input after sending
  };

  return (
    <div className="text-black fixed bottom-0 right-0 m-4 p-4 bg-white shadow-lg rounded-lg max-w-sm w-full">
      <div className="overflow-y-scroll h-64">
        {messages.map((message) => (
          <div key={message.id} className={`p-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Type a message..."
      />
    </div>
  );
};

export default ChatbotUI;
