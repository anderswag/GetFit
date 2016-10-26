'use strict'
import React, {Component} from 'react';
console.log("rendering <home/>");



class home extends Component {

  render() {
    return (<div>{this.props.children}</div>)
  }
}

export default home
