'use strict'
import React, {Component} from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'
var Router = require('react-router');

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
      first_name:'',
      last_name:'',
      username:'',
      picture:'http://i1.wp.com/www.techrepublic.com/bundles/techrepubliccore/images/icons/standard/icon-user-default.png',
      loginStatus:'Login',
      currTab:null,
      score:0
    };
    this.logout = this.logout.bind(this)
    this.props.socket.on('server::changeNav', (userData)=>{
      this.setState({
        picture: userData.picture,
        score: userData.score,
        username: userData.username
      },()=>{
        console.log(this.state.score)
      })
    })
  }

  logout = () => {
    localStorage.clear();
    location.href = '/'
  }

  changeNavTab = (tab) => {
    console.log(tab)

  }

  reload = () => {
    // console.log('reload');
    setInterval(
      ()=>{
        this.forceUpdate();
        console.log('reload');
      }, 3000);

  }

  componentDidMount() {
    // this.reload();
    fetch('http://localhost:8080/api/currentUser', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(function(response){
      return response.json();
    }).then((j) => {
      console.log(j[0]);
      let user = j[0];
      this.setState({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        picture: user.picture
      })
    })
  }

  render() {
    return (
        <div id="nav">
          <MuiThemeProvider>
            <CircularProgressExampleDeterminate score={this.state.score}/>
          </MuiThemeProvider>
          <div className="image-container">
            <img src={this.state.picture} className="image"/>
            <p className="navUsername">{this.state.username}</p>
          </div>
          <Link to="/find"><div className="nav-button" id="nav-button-1"><i className="fa fa-search fa-2x" aria-hidden="true"></i></div></Link>
          <Link to="/stats"><div className="nav-button" id="nav-button-2"><i className="fa fa-bar-chart fa-2x" aria-hidden="true"></i></div></Link>
          <Link to="/settings"><div className="nav-button" id="nav-button-3"><i className="fa fa-cog fa-2x" aria-hidden="true"></i></div></Link>
          <div action="/" className="nav-button" onClick = {this.logout}>
            Logout
          </div>
        </div>
    );
  }
}

export default NavBar
