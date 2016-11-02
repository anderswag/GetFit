'use strict'
import React, {Component} from 'react';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import CircularProgressExampleDeterminate from '../circleProgress.jsx';
import TableExampleSimple from '../mentorList.jsx';
import Geosuggest from 'react-geosuggest';
import { browserHistory } from 'react-router'
console.log("rendering <findModule/>");

// injectTapEventPlugin();
var input = document.getElementById('searchInput');
var autocomplete = new google.maps.places.Autocomplete(input);
const io = require('socket.io-client');
import socket from '../socketConnection';
// const socket = io.connect('http://localhost:8080', {reconnect: true});

class findModule extends Component {
  constructor(props){
    super(props);
    this.state =  {
      mentors:[],
      firstName:'',
      lastName :'',
      gym      :'',
      showlist :{display:'none'},
      selected : ''
    }
  }

  componentDidMount() {
    if(!localStorage.getItem("token")){
      browserHistory.push('/');
    } else {
      console.log('YOU HAVE A TOKEN!');
    }
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
      })
    })
  }

  sendRequest(reqObj, user) {
    socket.emit('client::message', [reqObj,user]);
  }

  handleEnter(event) {
    if(event.key === 'Enter') {
      this.setState({
        firstName:'',
        lastName :'',
        gym      :`${event.target.value}`
      },
      function whenFinished(){
        fetch(`http://localhost:8080/api/relevent-mentors?gym=${this.state.gym}`).then(function(response) {
      // Convert to JSON
      return response.json();
      }).then((j) => {
        // Yay, `j` is a JavaScript object
          console.log(j)
          this.setState({
            mentors:j,
            showlist:{display:'block'}
          })
        });
      })
    }
  }



  render() {
    return (
        <div>
          <div className="findGeo">
            <Geosuggest onKeyPress={this.handleEnter.bind(this)}/>
          </div>
          <MuiThemeProvider>
            <TableExampleSimple style={this.state.showlist} mentorList={this.state.mentors} user={this.state.first_name} socket={this.sendRequest}/>
          </MuiThemeProvider>
        </div>
    );
  }
}

export default findModule
