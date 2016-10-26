'use strict'
import React, {Component} from 'react';
import { Link } from 'react-router';
console.log("rendering <SettingsPage/>");



class SettingsPage extends Component {

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
