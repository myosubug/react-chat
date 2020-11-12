import React from 'react';
import './infobar.css';


const InfoBar = ({ room }) => (
  <div className="infoBox">
    <div className="leftBox">
      <h3> this-is-a-random-chat </h3>
    </div>
    <div className="rightBox">
      <a href="/"><span role="img" aria-label="close">❌</span></a>
    </div>
  </div>
);

export default InfoBar;