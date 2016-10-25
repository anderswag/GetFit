import React, {Component} from 'react';
import NavBar from './navbar.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgressExampleDeterminate from './circleProgress.jsx';
import TableExampleSimple from './mentorList.jsx';


injectTapEventPlugin();
var input = document.getElementById('searchInput');
var autocomplete = new google.maps.places.Autocomplete(input);

class App extends Component {

  constructor(props){
    super(props);
    this.state =  {
      mentors:[]
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/users').then(function(response) {
      // Convert to JSON
      return response.json();
    }).then((j) => {
      // Yay, `j` is a JavaScript object
      console.log(j)
      this.setState({mentors:j})
    });
  }

  render() {
    return (
      <div>
        <NavBar/>
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
export default App;
