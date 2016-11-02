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
    }).then(()=>{
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
         <table className="leaderTable">
           <tr>
             <th>Username</th>
             <th>Gym</th>
             <th>Reputation</th>
           </tr>
        {this.state.mentors.map((mentor, index) => {
          return (
              <tr key={index} >
                <td><div><img  width='90' height='90'src={mentor.picture}/>{mentor.username}</div></td>
                <td>{mentor.gym}</td>
                <td>{mentor.score}</td>
              </tr>
          )
        })}
        </table>
      </div>
    )
  }
}

export default SettingsPage