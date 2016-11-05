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
      selected : '',
      quote    : ''
    }
  }

  componentDidMount() {
    if(!localStorage.getItem("token")){
      browserHistory.push('/');
    } else {
      console.log('YOU HAVE A TOKEN!');
    }
    const motivationalQuote = [
      '"If you want to achieve greatness stop asking for permission." --Anonymous',
      '"Things work out best for those who make the best of how things work out." --John Wooden',
      '"To live a creative life, we must lose our fear of being wrong." --Anonymous',
      '"If you are not willing to risk the usual you will have to settle for the ordinary." --Jim Rohn',
      '"All our dreams can come true if we have the courage to pursue them." --Walt Disney',
      '"Good things come to people who wait, but better things come to those who go out and get them." --Anonymous',
      '"If you do what you always did, you will get what you always got." --Anonymous',
      '"Success is walking from failure to failure with no loss of enthusiasm." --Winston Churchill',
      '"No one can make you feel inferior without your consent." --Eleanor Roosevelt',
      '"If you are going through hell keep going." --Winston Churchill',
      '"What seems to us as bitter trials are often blessings in disguise." --Oscar Wilde',
      ' "No masterpiece was ever created by a lazy artist." --Anonymous',
      '"Veni, vidi, vici" --Gaius Julius Caesar',
      '"Carpe Diem" -- Horace',
    ]
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
    let num = Math.floor( Math.random() * motivationalQuote.length )
    this.setState({quote: motivationalQuote[num]});
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
          <h1 className="motivationalQuote">{this.state.quote}</h1>
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
