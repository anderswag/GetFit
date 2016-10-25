import React, {Component} from 'react';
import NavBar from './navbar.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgressExampleDeterminate from './circleProgress.jsx';
import Geosuggest from 'react-geosuggest';

injectTapEventPlugin();
var input = document.getElementById('searchInput');
var autocomplete = new google.maps.places.Autocomplete(input);

class App extends Component {
  getinitialState() {
    var data = {
      firstName:'',
      lastName :'',
      gym      :''
    }
    return {data: data}
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts').then(function(response) {
      // Convert to JSON
      return response.json();
    }).then(function(j) {
      // Yay, `j` is a JavaScript object
      console.log(j)
    });
  }

  handleEnter(event) {
    if(event.key === 'Enter') {
      this.setState({
        firstName:'',
        lastName :'',
        gym      :`${event.target.value}`
      }, function whenFinished(){
        console.log(this.state)
      })
    }
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Geosuggest onKeyPress={this.handleEnter.bind(this)}/>
          <MuiThemeProvider>
            <CircularProgressExampleDeterminate/>
          </MuiThemeProvider>
      </div>
    );
  }
}
export default App;
