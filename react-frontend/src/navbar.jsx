'use strict'
import React, {Component} from 'react';
import { Link } from 'react-router';
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
          <Link to="/find"><div className="nav-button" id="nav-button-1">Find</div></Link>
          <div className="nav-button" id="nav-button-2">STATS</div>
          <Link to="/settings"><div className="nav-button" id="nav-button-3">SETTINGS</div></Link>
          {this.props.children}
        </div>
    );
  }
}

export default NavBar
