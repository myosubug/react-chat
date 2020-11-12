import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from './InfoBar';
import Input from './Input';
import Message from './Message';
import UserList from './UserList';
import './chat.css';

let socket;
let userColor = new Map();
let currentUser;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:8080';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
    
        socket = io(ENDPOINT);
    
        setRoom(room);
        setName(name);
        currentUser = name;
    
        socket.emit('join', { name, room }, (error) => {
          if(error) {
            alert(error);
          }
        });
      }, [ENDPOINT, location.search]);
      
    useEffect(() => {
      socket.on('message', (message) => {
        var today = new Date();
        let time = today.getHours() + 'h' + today.getMinutes() + 'm' + today.getSeconds()+"s";
        let newColor = "";
        let notifyMessage;

        if (message.oldName === currentUser){
          setName(message.user);
          currentUser = message.user;
        }
        if (message.text.includes("/color")){
          let splited = message.text.split(/(\s+)/).filter( e => e.trim().length > 0);
          newColor = "#"+splited[1];
          userColor[message.user] = newColor;
          notifyMessage = {user: "admin", text: "your username color is changed"};
        }
        message.text += " ("+ time + ")";
        setMessages(messages => [ ...messages, message ]);
        if (notifyMessage){
          setMessages(messages => [ ...messages, notifyMessage ]);
        }
      });
      
      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });
    }, []);
    
    const sendMessage = (event) => {
      event.preventDefault();
  
      if(message) {
        socket.emit('sendMessage', message, currentUser, () => setMessage(''));
      }
    }
    
    return (
      <div className="outerContainer">
        <div className="container">
            <InfoBar room={room} />
            <Message messages={messages} name={name} userColor={userColor}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <UserList users={users}/>
      </div>
    );
}
    
export default Chat;