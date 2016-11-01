"use strict";

const express = require('express');
const router  = express.Router();
// const io = require('socket.io-client')
// const socket = io.connect('http://localhost:8085', {reconnect: true});

module.exports = (knex) => {

  // socket.on('connect', function(socket) {
  //     console.log('Connected!');
  // });

  // socket.on("note", function(data) {
  //   console.log(data);
  // });

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        // socket.on("note", function(data) {
          res.json(data);
        // });
        // socket.emit('message', "this is a test");
    });
  });

  return router;
}
