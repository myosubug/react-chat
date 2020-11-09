import React from 'react';
import onlineIcon from '../../src/icons/onlineIcon.png';
import './userlist.css';

const UserList = ({ users }) => (
  <div className="textContainer">
    <div>
      <h2>Currently online users are <span role="img" aria-label="emoji"> 🤩</span></h2>
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default UserList;