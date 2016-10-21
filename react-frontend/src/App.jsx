import React, {Component} from 'react';
import NavBar from './navbar.jsx';

class App extends Component {


  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts').then(function(response) {
      // Convert to JSON
      return response.json();
    }).then(function(j) {
      // Yay, `j` is a JavaScript object
      console.log(j)
    });
  }

  render() {
    return (
      <div>
        <NavBar/>
      </div>
    );
  }

}
export default App;
