var React = require('react');
var ReactDOM = require('react-dom');
var NotificationSystem = require('react-notification-system');
const io = require('socket.io-client');
// const socket = io.connect('http://localhost:8080', {reconnect: true});
import socket from '../socketConnection';

var Notification = React.createClass({
  _notificationSystem: null,
  _addNotification: function(data, type) {
    if(type === 'help'){
      var rQuery = `Hey ${data[0].first_name} ${data[1]} wants to know if you can help`
    } else {
      var rQuery = `${data} has accepted your request`
    }
    // event.preventDefault();
    this._notificationSystem.addNotification({
      message: rQuery,
      level: 'success',
      autoDismiss: 30,
      action:{
        label: 'Accept',
        callback: function(){
          console.log('Accepted');
          socket.emit('client::accept', data[0].first_name)
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
        that._addNotification(data, 'help')
      });
      socket.on("server::accept", function(data){
        that._addNotification(data, 'accept')
      })
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