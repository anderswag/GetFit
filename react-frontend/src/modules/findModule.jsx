'use strict'
import React, {Component} from 'react';
console.log("rendering <findModule/>");



class findModule extends Component {

  render() {
    return (
        <div id="nav">
          <Geosuggest/>
          <MuiThemeProvider>
            <CircularProgressExampleDeterminate/>
          </MuiThemeProvider>
          <MuiThemeProvider>
            <TableExampleSimple mentorList={this.state.mentors} />
          </MuiThemeProvider>
        </div>
    );
  }
}

export default findModule
