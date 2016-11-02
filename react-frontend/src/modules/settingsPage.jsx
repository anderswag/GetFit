'use strict'
import React, {Component} from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
console.log("rendering <SettingsPage/>");
  const styles = {
    block: {
      maxWidth: 250,
    },
    toggle: {
      'padding-top': 25,
      marginBottom: 16,
      top: 100,
      left: 200,
      width: 250,
      height: 50,
      background: '#2c2c31',
      color:'#1db9b7',
      'border-radius': 10
    },
    labelStyle: {
      'padding-left': 10,
      color:'#1db9b7',
      'font-size': 23
    }
  };

class SettingsPage extends Component {

  constructor(props){
    super(props);
    this.state =  {
      mentor: false
    }
  }

  componentDidMount() {
    if(!localStorage.getItem("token")){
      browserHistory.push('/');
    } else {
      console.log('YOU HAVE A TOKEN!');
    }
    fetch('http://localhost:8080/api/settings', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      }
    })
    .then(function(response){
      return response.json()
    }).then((responseObject) => {
      this.setState({mentor:(responseObject[0].mentor)})
      console.log(responseObject[0].mentor)
    })
    //this.state.login_username
  }

  handleMentorSwitch = () => {
    if (this.state.mentor === false) {
      let status = true
      this.handleMentorFetch(status)
    }
    else {
      let status = false
      this.handleMentorFetch(status)
    }
  }

  handleMentorFetch = (status) => {
    fetch('http://localhost:8080/api/settings', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
      },
      body: JSON.stringify({
        mentor: status
      })
    })
    .then(function(response){
      return response.json()
      console.log(response)
    }).then((responseObject) => {
      this.setState({mentor:(responseObject)})
    })
  }


  render() {
    return (
      <div className="previewComponent">
      <MuiThemeProvider>
        <div style={styles.block}>
          <Toggle label="Become a mentor" labelStyle={styles.labelStyle} style={styles.toggle} onClick={this.handleMentorSwitch} defaultToggled={this.state.mentor}/>
        </div>
      </MuiThemeProvider>
      </div>
    )
  }
}

export default SettingsPage
