'use strict'
import React, {Component} from 'react';
import App from './App.jsx';
console.log("rendering <NavBar/>");



class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type:"",
      username: "Anon",
      content: "",
      olduser:""
    };

  }

  render() {
    return (
        <div id="nav">
          <div className="image-container">
            <div className="image"></div>
          </div>
          <div className="nav-button" id="nav-button-1">FIND</div>
          <div className="nav-button" id="nav-button-2">STATS</div>
          <div className="nav-button" id="nav-button-3">SETTINGS</div>
        </div>
    );
  }
}

export default NavBar
