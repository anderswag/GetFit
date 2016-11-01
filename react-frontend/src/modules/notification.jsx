var React = require('react');
var ReactDOM = require('react-dom');
var NotificationSystem = require('react-notification-system');
const io = require('socket.io-client');
// const socket = io.connect('http://localhost:8080', {reconnect: true});
import socket from '../socketConnection';

var Notification = React.createClass({
  _notificationSystem: null,
  _addNotification: function(data) {
    // event.preventDefault();
    this._notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success',
      autoDismiss: 10,
      action:{
        label: 'Accept',
        callback: function(){
          console.log('Accepted')
        }
      }
    });
  },

  componentDidMount: function() {
    this._notificationSystem = this.refs.notificationSystem;
    var that = this;
      socket.on("server::note", function(data) {
        //Do notification here//
        console.log(data)
        that._addNotification(data)
      });
  },

  render: function() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" />
      </div>
      );
  }
});

export default Notification