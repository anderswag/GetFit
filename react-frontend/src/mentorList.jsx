import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';



export default class TableExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }



  render() {
    return (
      <div className = "mentor-list">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Picture</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
          <TableHeaderColumn>Score</TableHeaderColumn>
        </TableRow>
      </TableHeader>
        <TableBody>
      {this.props.mentorList.map((item,index)=>(
          <TableRow key={index}>
          <TableRowColumn><img src={item.picture} height="42" width="42"/></TableRowColumn>
          <TableRowColumn>{item.first_name} {item.last_name}</TableRowColumn>
          <TableRowColumn>Employed</TableRowColumn>
          <TableRowColumn>{item.score}</TableRowColumn>
          </TableRow>
      ))}
        </TableBody>
      </Table>

      </div>
      );
}
}