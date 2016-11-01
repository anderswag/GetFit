'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:8081/', {reconnect: true,
  /*transports: ['websocket']*/

});

export default socket