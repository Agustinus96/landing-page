// components/ChatbotUI.js
import { useState } from 'react';

const ChatbotUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const baseUrl = process.env.URL;

  const fetchChatGPTResponse = async (message) => {
    const response = await fetch(`/api/chat`, {
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
    <div className="text-black flex flex-col justify-inbetween right-0 m-4 p-4 h-full">
      <div className="overflow-y-scroll w-full flex-wrap m-auto p-auto shrink">
        {messages.map((message) => (
          <div className={`grid ${message.sender === 'user' ? 'justify-items-end' : 'justify-items-start'}`}>
          <div key={message.id} className={`px-4 py-2 mb-2 ${message.sender === 'user' ? 'max-w-[85%] text-right bg-emerald-200 justify-items-end rounded-xl' : 'max-w-[85%] text-left bg-emerald-400 basis-4/5 place-content-start rounded-xl'}`}>
            {message.text}
          </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
        className="text-gray-300 w-full p-2 border border-gray-300 rounded h-12"
        placeholder="Type a message..."
      />
    </div>
  );
};

export default ChatbotUI;
