'use strict'
import React, {Component} from 'react';
console.log("rendering <home/>");
import Geosuggest from 'react-geosuggest';
const input = document.getElementById('searchInput');
import { browserHistory } from 'react-router'
var Router = require('react-router');
const autocomplete = new google.maps.places.Autocomplete(input);
import socket from './socketConnection';
class home extends Component {

  constructor(props) {
    super(props);
    this.tokenHandler = this.tokenHandler.bind(this);
  }

  render() {
    return (
    <div className="main-sign-form">
      <div className="register-form">
        <form onSubmit={this.submitRegister}>
          <input type="text" name="first_name" onChange={(event) => this.setState({ first_name: event.target.value })} placeholder="first name"/>
          <input type="text" name="last_name" onChange={(event) => this.setState({ last_name: event.target.value })} placeholder="last name"/>
          <input type="text" name="username" onChange={(event) => this.setState({ username: event.target.value })} placeholder="username"/>
          <input type="text" name="email" onChange={(event) => this.setState({ email: event.target.value })} placeholder="email"/>
          <input type="text" name="picture" onChange={(event) => this.setState({picture: event.target.value})} placeholder="profile picture"/>
          <input type="password" name="password" onChange={(event) => this.setState({ password: event.target.value })} placeholder="password"/>
          <input type="password" name="confirm_password" onChange={(event) => this.setState({ confirm_password: event.target.value })} placeholder="confirm password"/>
          <Geosuggest type="text" onSuggestSelect={(suggest) => this.setState({gym: suggest.label})} placeholder="select your gym"/>
          <input className="registerSubmit" type="submit" value="Register"/>
        </form>
      </div>
      <div className="login-form">
        <form onSubmit={this.submitLogin}>
          <input type="text" name="login_username" onChange={(event) => this.setState({login_username: event.target.value})} placeholder="please enter a username"/>
          <input type="password" name="login_password" onChange={(event) => this.setState({login_password: event.target.value})} placeholder="please enter a password"/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    </div>
    )
  }

  tokenHandler = (token) => {
    localStorage.setItem("token", token);
    this.setState({
      stateToken: token
    })
    this.props.router.push('/find')
    // Router.browserHistory.push('/#/find')
  }

  submitRegister = (e) => {
    e.preventDefault()
    if (this.state.password === this.state.confirm_password) {
      fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name : this.state.last_name,
          username  : this.state.username,
          email     : this.state.email,
          picture   : this.state.picture,
          password  : this.state.password,
          gym       : this.state.gym
        })
      })
      .then((response) => {
        return response.json()
      })
      .then((registerResponse) => {
        socket.emit('client::changeNav', registerResponse.user);
        this.tokenHandler(registerResponse.token);
      })
    }
  }

  submitLogin = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        login_username: this.state.login_username,
        login_password: this.state.login_password,
      })
    })
    .then(function(response){
      return response.json()
    })
    .then((loginResponse) => {
      console.log(loginResponse.user);
      socket.emit('client::changeNav', loginResponse.user);
      this.tokenHandler(loginResponse.token);
    })
  }
}

export default home
