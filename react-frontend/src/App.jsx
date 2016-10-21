import React, {Component} from 'react';
import NavBar from './navbar.jsx';

var input = document.getElementById('searchInput');
var autocomplete = new google.maps.places.Autocomplete(input);

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
      </div>
    );
  }
}
export default App;
