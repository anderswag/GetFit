'use strict'
import React, {Component} from 'react';
console.log("rendering <home/>");
import Geosuggest from 'react-geosuggest';
const input = document.getElementById('searchInput');
const autocomplete = new google.maps.places.Autocomplete(input);



class home extends Component {

  render() {
    return (
    <div>
      <div className="register-form">
        <form onSubmit={this.submitRegister}>
          <input type="text" name="first_name" onChange={(event) => this.setState({ first_name: event.target.value })} placeholder="first name"/>
          <input type="text" name="last_name" onChange={(event) => this.setState({ last_name: event.target.value })} placeholder="last name"/>
          <input type="text" name="username" onChange={(event) => this.setState({ username: event.target.value })} placeholder="username"/>
          <input type="text" name="email" onChange={(event) => this.setState({ email: event.target.value })} placeholder="email"/>
          <input type="password" name="password" onChange={(event) => this.setState({ password: event.target.value })} placeholder="password"/>
          <input type="password" name="confirm_password" onChange={(event) => this.setState({ confirm_password: event.target.value })} placeholder="confirm password"/>
          <Geosuggest type="text" onSuggestSelect={(suggest) => this.setState({gym: suggest.label})}/>
          <input type="submit" value="submit"/>
        </form>
      </div>
      <div className="login-form">
        <form onSubmit={this.submitLogin}>
          <input type="text" name="login_username" onChange={(event) => this.setState({login_username: event.target.value})} placeholder="please enter a username"/>
          <input type="password" name="login_password" onChange={(event) => this.setState({login_password: event.target.value})} placeholder="please enter a password"/>
          <input type="submit" value="submit"/>
        </form>
      </div>
    </div>
    )
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
          password  : this.state.password,
          gym       : this.state.gym
        })
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
    .then(function(blob){
      console.log(blob)
    })
  }
}

export default home
