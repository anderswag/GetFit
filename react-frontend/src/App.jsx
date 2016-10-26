import React, {Component} from 'react';
import NavBar from './navbar.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgressExampleDeterminate from './circleProgress.jsx';
import TableExampleSimple from './mentorList.jsx';
import Geosuggest from 'react-geosuggest';

injectTapEventPlugin();
var input = document.getElementById('searchInput');
var autocomplete = new google.maps.places.Autocomplete(input);

class App extends Component {

  constructor(props){
    super(props);
    this.state =  {
      mentors:[],
      firstName:'',
      lastName :'',
      gym      :'',
      showlist :{display:'none'}
    }
  }

  componentDidMount() {
  }

  handleEnter(event) {
    if(event.key === 'Enter') {
      this.setState({
        firstName:'',
        lastName :'',
        gym      :`${event.target.value}`
      },
      function whenFinished(){
        fetch(`http://localhost:8080/api/relevent-mentors?gym=${this.state.gym}`).then(function(response) {
      // Convert to JSON
      return response.json();
      }).then((j) => {
        // Yay, `j` is a JavaScript object
        console.log(j)
        this.setState({
          mentors:j,
          showlist:{display:'block'}
        })
        });
      })
    }
  }

  render() {
    return (
      <div>
        <NavBar/>
        <MuiThemeProvider>
          <CircularProgressExampleDeterminate/>
        </MuiThemeProvider>
        <div>
          <Geosuggest onKeyPress={this.handleEnter.bind(this)}/>
          <MuiThemeProvider>
            <TableExampleSimple style={this.state.showlist} mentorList={this.state.mentors} />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
export default App;
