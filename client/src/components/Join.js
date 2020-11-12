import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './join.css';

const Join = () => {
    const [name, setName] = useState('');
    const room = 'seng513';

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">
                    <div><input placeholder="Name" className="joinInput" type="test" onChange={(event) => setName(event.target.value)}/></div>
                    <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button className="button mt-20" type="submit">Join the party!</button>
                    </Link>
                </h1>
            </div>
        </div>
    )
}

export default Join;