import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';



export default class TableExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(event.target.value);
  }

  render() {
    return (
      <div className = "mentor-list" style={this.props.style}>
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
        <TableRow className ="rowStyle" value={item} key={index} onRowClick={(ev, row) => console.log('row')}>
          <TableRowColumn><img src={item.picture} height="90" width="90"/></TableRowColumn>
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