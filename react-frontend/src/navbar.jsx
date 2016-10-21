'use strict'
import React from 'react';
import App from './App.jsx';
console.log("rendering <NavBar/>");
const NavBar = React.createClass({
  render: function() {
    return (
      <div>
        <div id="nav">
          <div className="image-container">
            <div className="image"></div>
          </div>
          <div className="nav-button" id="nav-button-1">FIND</div>
          <div className="nav-button" id="nav-button-2">STATS</div>
          <div className="nav-button" id="nav-button-3">SETTINGS</div>
        </div>
      </div>
    );
  }
});
export default NavBar