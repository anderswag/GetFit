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
      marginBottom: 16,
      top: 100,
      left: 200,
      width: 250
    },
    thumbOff: {
      backgroundColor: '#ffcccc',
    },
    trackOff: {
      backgroundColor: '#ff9d9d',
    },
    thumbSwitched: {
      backgroundColor: 'red',
    },
    trackSwitched: {
      backgroundColor: '#ff9d9d',
    },
    labelStyle: {
      color: 'red',
    },
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
          <Toggle label="Become a mentor" style={styles.toggle} onClick={this.handleMentorSwitch} defaultToggled={this.state.mentor}/>
        </div>
      </MuiThemeProvider>
      </div>
    )
  }
}

export default SettingsPage
