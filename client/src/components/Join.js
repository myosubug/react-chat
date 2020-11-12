import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './join.css';

const Join = () => {
    const [name, setName] = useState('');
    const room = 'seng513';

    return (
        <div className="joinOuterBox">
            <div className="joinInnerBox">
                <h1 className="heading">
                    <div><input placeholder="Name" className="joinInput" type="test" onChange={(event) => setName(event.target.value)}/></div>
                    <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button className="button" type="submit">Join the night chat!</button>
                    </Link>
                </h1>
            </div>
        </div>
    )
}

export default Join;