'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:8080', {reconnect: true});

export default socket