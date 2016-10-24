'use strict'
import React from 'react';
import App from './App.jsx';
import CircularProgress from 'material-ui/CircularProgress';


export default class CircularProgressExampleDeterminate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {
    return (
      <div className="statcircle">
        <CircularProgress
          mode="determinate"
          value={this.state.completed}
          size={280}
          thickness={9}
        />
      </div>
    );
  }
}