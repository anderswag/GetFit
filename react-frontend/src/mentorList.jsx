import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';



export default class TableExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      submitReady:false,
      selectedMentor:null
    };
    this.setSelectedMentor = this.setSelectedMentor.bind(this);
  }

  setSelectedMentor(mentor) {
    // this.props.select(this.props.mentorList[mentor])
    this.selectedMentor = this.props.mentorList[mentor]
    // console.log(this.selectedMentor)
  }

  render() {
    return (
      <div className = "mentor-list" style={this.props.style}>
      <Table onCellClick={this.setSelectedMentor}>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Picture</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>

          <TableHeaderColumn>Score</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {this.props.mentorList.map((item,index)=>(
        <TableRow className ="rowStyle" value={item} key={index}>
          <TableRowColumn><img src={item.picture} height="90" width="90"/></TableRowColumn>
          <TableRowColumn>{item.first_name} {item.last_name}</TableRowColumn>

          <TableRowColumn>{item.score}</TableRowColumn>
        </TableRow>
      ))}
      </TableBody>
      </Table>
        <div className="sendRequest" onClick={()=> this.props.socket(this.selectedMentor, this.props.user)}>
        Show me the ropes
        </div>
      </div>
      );
  }
}