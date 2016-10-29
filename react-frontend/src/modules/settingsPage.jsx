'use strict'
import React, {Component} from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
console.log("rendering <SettingsPage/>");



class SettingsPage extends Component {
  componentDidMount() {
    if(!localStorage.getItem("token")){
      browserHistory.push('/');
    } else {
      console.log('YOU HAVE A TOKEN!');
    }
  }


  constructor(props) {
    super(props);
    this.state = {
      type:"",
      username: "Anon",
      content: "",
      olduser:""
    };

  }

  render() {
    return (
        <div>Fun stuff</div>
    );
  }
}

export default SettingsPage
