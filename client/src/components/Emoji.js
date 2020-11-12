import React from 'react';
import './emoji.css';
import ReactEmoji from 'react-emoji';

const Emoji = ({ message: { text, user}, name, userColor }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  const userNameStyle = {
    color: userColor[user],
    display: "flex",
    alignItems: "center",
    fontFamily: "Helvetica",
    letterSpacing: "0.3px",
    paddingLeft: "10px",
  };

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer pushRight">
          <div className="messageBox sender">
            <p className="messageText fontWhite">{ReactEmoji.emojify(text)}</p>
          </div>
          <p style= {userNameStyle}>{user}</p>
        </div>
        )
        : (
          <div className="messageContainer pushLeft">
            <div className="messageBox other">
              <p className="messageText fontBlack">{ReactEmoji.emojify(text)}</p>
            </div>
            <p style= {userNameStyle}>{user}</p>
          </div>
        )
  );
}

export default Emoji;