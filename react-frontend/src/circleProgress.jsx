'use strict'
import React from 'react';
import App from './App.jsx';
import CircularProgress from 'material-ui/CircularProgress';


export default class CircularProgressExampleDeterminate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 100,
      score:0
    };
  }

  componentDidMount() {
    console.log(this.props.score);
    this.timer = setTimeout(() => this.progress(0), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    // console.log(this.props.score);
    // console.log(this.state.score);
    // this.setState({
    //   score: this.props.score
    // })
    if (completed > 100) {
      this.setState({completed: 85});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 30);
    }
  }

  render() {
    return (
      <div className="statcircle">
        <CircularProgress
          mode="determinate"
          value={this.state.completed}
          size={110}
          thickness={5}
          color="#FF9800"
        />
      </div>
    );
  }
}