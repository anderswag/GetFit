'use strict'
import React, {Component} from 'react';
import { Link } from 'react-router';

// Circle
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgressExampleDeterminate from './circleProgress.jsx';

injectTapEventPlugin();
console.log("rendering <NavBar/>");

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type:"",
      username: "Anon",
      content: "",
      olduser:"",
      currTab:null
    };

  }

  logout = () => {
    localStorage.clear();
  }

  changeNavTab = (tab) => {
    console.log(tab)

  }

  render() {
    return (
        <div id="nav">
          <MuiThemeProvider>
            <CircularProgressExampleDeterminate/>
          </MuiThemeProvider>
          <div className="image-container">
            <div className="image"></div>
          </div>
          <Link to="/find"><div className="nav-button" id="nav-button-1"><i className="fa fa-search fa-2x" aria-hidden="true"></i></div></Link>
          <div className="nav-button" id="nav-button-2"><i className="fa fa-bar-chart fa-2x" aria-hidden="true"></i></div>
          <Link to="/settings"><div className="nav-button" id="nav-button-3"><i className="fa fa-cog fa-2x" aria-hidden="true"></i></div></Link>
          <div className="nav-button" onClick = {this.logout}>
            Logout
          </div>
        </div>
    );
  }
}

export default NavBar
