'use strict'
import React, {Component} from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
console.log("rendering <SettingsPage/>");

class SettingsPage extends Component {

  constructor(props){
    super(props);
    this.state =  {
      mentors: []
    }
  }
  handleVote = (mentor,direction) => {
    console.log(direction)
    fetch('http://localhost:8080/api/stats', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify({
        first_name: mentor.first_name,
        last_name: mentor.last_name,
        gym: mentor.gym,
        direction: direction
      })
    })
    .then(function(response) {
      return response.json()
    }).then((responseObject) => {
      console.log(responseObject[0].score)
    })
  }
  componentDidMount() {
    if(!localStorage.getItem("token")){
      browserHistory.push('/');
    } else {
      console.log('YOU HAVE A TOKEN!');
    }
    fetch('http://localhost:8080/api/stats', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(function(response){
      return response.json()
    }).then((responseObject) => {
      this.setState({mentors:responseObject})
    }).then((array) => {
      console.log(this.state)
    })
    //this.state.login_username
  }

  render() {
    return (
      <div className="leaderboard">
        {this.state.mentors.map((mentor, index) => {
          return (
            <div key={index} className="mentor-card">
              <div>
                <img  width='90' height='90'src={mentor.picture}/>
              </div>
              <div className='first_name'>{mentor.first_name}</div>
              <div className='last_name'>{mentor.last_name}</div>
              <div className='gym'>{mentor.gym}</div>
              <div className='score'>{mentor.score}</div>
              <div type="submit" className="up-vote" onClick={this.handleVote.bind(this, mentor, 'up')}>up rep!</div>
              <div type="submit" className="down-vote" onClick={this.handleVote.bind(this, mentor,'down')}>down rep!</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default SettingsPage