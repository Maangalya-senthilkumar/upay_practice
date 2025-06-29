import React, { useState } from 'react';
import axios from 'axios';

function Chatbot({ className = '' }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me about books, admin actions, or login.' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    try {
      const res = await axios.post('http://localhost:5000/api/chatbot', { message: input });
      setMessages(msgs => [...msgs, { from: 'bot', text: res.data.reply }]);
    } catch {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Error talking to server.' }]);
    }
  };

  return (
    <div className={className + ' chatbot'} style={{border: '1px solid #ccc', padding: 10, width: 300, position: 'fixed', bottom: 20, right: 20, background: '#fff', zIndex: 1000, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
      <div style={{height: 150, overflowY: 'auto', marginBottom: 10}}>
        {messages.map((m, i) => (
          <div key={i} style={{textAlign: m.from === 'bot' ? 'left' : 'right'}}>
            <b>{m.from === 'bot' ? 'Bot' : 'You'}:</b> {m.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type your question..."
        style={{width: '80%'}}
      />
      <button onClick={sendMessage} style={{width: '18%'}}>Send</button>
    </div>
  );
}

export default Chatbot;