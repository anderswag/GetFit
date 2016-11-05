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
             <th>Leaderboards</th>
             <th>Username</th>
             <th>Reputation</th>
             <th></th>
           </tr>
        {this.state.mentors.map((mentor, index) => {
          return (
              <tr key={index} >
                <td><div><img  width='90' height='90'src={mentor.picture}/></div></td>
                <td>{mentor.username}</td>
                <td>{mentor.score}</td>
                <td>
                <div className='voteContainer'>
                  <div type="submit" className="up-vote" onClick={this.handleVote.bind(this, mentor, 'up')}><i className="fa fa-arrow-up" aria-hidden="true"></i></div>
                  <div type="submit" className="down-vote" onClick={this.handleVote.bind(this, mentor,'down')}><i className="fa fa-arrow-down" aria-hidden="true"></i></div>
                </div>
                </td>
              </tr>
          )
        })}
        </table>
      </div>
    )
  }
}

export default SettingsPage