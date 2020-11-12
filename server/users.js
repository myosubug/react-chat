const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    let user = {id, name, room};
    let randomName;
    let randomDigit;

    const existing = users.find((user => user.name === name));
    if (existing){
        randomDigit = Math.floor(Math.random() * Math.floor(9999)).toString();
        randomName = "random" + randomDigit;
        user.name = randomName;
    } 
    users.push(user);
    return {user};
};

const changeUserName = (id, newName) =>{
    let user = getUser(id);
    const existing = users.find((user => user.name === newName));
    if (existing){
        return ;
    } else {
        user.name = newName;
    }
    
};


const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1){
        return users.splice(index,1)[0];
    }
};

const getUser = (id) => {
    return users.find((user) => user.id === id)
};

const getUserInRoom = (room) => {
    return users.filter((user)=> user.room === room)
};

module.exports = {addUser, removeUser, getUser, getUserInRoom, changeUserName};