import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [password, setPassword] = useState('');
  const [decryptedMessages, setDecryptedMessages] = useState([]);
  const socket = io('http://localhost:3000');

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const handleSend = () => {
    const encryptedMessage = CryptoJS.AES.encrypt(newMessage, password).toString();
    socket.emit('message', encryptedMessage);
    setNewMessage('');
    setPassword('')
  };

  const handleDecrypt = (encryptedMessage) => {
    const password = prompt('Enter the password to decrypt the message:');
    if (password) {
      try {
        const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, password).toString(CryptoJS.enc.Utf8);
        setDecryptedMessages([...decryptedMessages, decryptedMessage]);
      } catch (error) {
        alert('Decryption failed!');
        prompt("Decryption Failed");
      }
    }
  };

  return (
    <div className="container">
        <div className="header">
          <h1 className="spy-chat">SpyChat</h1>
        </div>
      <div className="encrypted-messages">
        {messages.map((msg, index) => (
          <div className="message-container row" key={index}>
            <div className="col-sm-8 message">{msg}</div>
            <div className="col-sm-2"><button className='decrypt-button' onClick={() => handleDecrypt(msg)}> Decrypt </button></div>
            
          </div>
          
        ))}
      </div>
      <input className="message-input" type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Enter message" />
      <input className="message-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
      <button onClick={handleSend}>Send</button>
      <div className="decrypted-message-container">
        <h2 className="messages-header">Decrypted Messages</h2>
        <div className="decrypted-messages">
          {decryptedMessages.map((message, index) => (
            <p className="decrypted-message" key={index}>{message}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;