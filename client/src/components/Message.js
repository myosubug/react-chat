import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Emoji from './Emoji';
import './message.css';

const Message = ({ messages, name, userColor }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Emoji message={message} name={name} userColor={userColor}/></div>)}
  </ScrollToBottom>
);

export default Message;