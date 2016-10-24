import React, {Component} from 'react';
import NavBar from './navbar.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgressExampleDeterminate from './circleProgress.jsx';

injectTapEventPlugin();
var input = document.getElementById('searchInput');
var autocomplete = new google.maps.places.Autocomplete(input);

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
          <MuiThemeProvider>
            <CircularProgressExampleDeterminate/>
          </MuiThemeProvider>
      </div>
    );
  }
}
export default App;
