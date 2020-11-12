import React from 'react';
import './emoji.css';
import ReactEmoji from 'react-emoji';

const Emoji = ({ message: { text, user}, name, userColor }) => {
  let isSentByCurrentUser = false;
  console.log(name);
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
        <div className="messageContainer justifyEnd">
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
          <p style= {userNameStyle}>{user}</p>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p style= {userNameStyle}>{user}</p>
          </div>
        )
  );
}

export default Emoji;