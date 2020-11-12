import React from 'react';
import './userlist.css';

const UserList = ({ users }) => (
  <div className="userListBox">
    <div>
      <h2>Currently online<span role="img" aria-label="admin-face"> 🌝 </span></h2>
    </div>
    {
      users
        ? (
          <div>
            <div className="userList">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeUser">
                    {name} <span role="img" aria-label="fire"> 🔥 </span>
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