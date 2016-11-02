"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');


// Seperated Routes for each Resource
const usersRoutes          = require("./routes/users");
const releventMentorRoutes = require("./routes/relevent-mentors");
const registerRoutes       = require("./routes/register");
const loginRoutes          = require("./routes/login");
const settingsRoutes       = require("./routes/settings");
const statsRoutes          = require("./routes/stats");
//SOCKET START




// Load requirements
const http = require('http');
const socketIO = require('socket.io');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.json({ type: "application/json" }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
  next();

})

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/relevent-mentors", releventMentorRoutes(knex));
app.use("/api/register", registerRoutes(knex));
app.use("/api/login", loginRoutes(knex));
app.use("/api/settings", settingsRoutes(knex));
app.use("/api/stats", statsRoutes(knex));
// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.options("/*", function(req, res, next) {
  console.log("HOPTIONS!")
   res.send(200);
})

// Create server & socket
//onst server = http.Server(app)
//const io = socketIO(server, {path: "/socket.io/"});
const io = socketIO(8081);

io.on('connection', function(socket) {

    socket.on('client::message', function (message){
      // for(let k in io.clients().connected) {
      //   console.log(k, socket.id, k !== socket.id)
      //   if(k !== socket.id) {
      //     console.log("send")
      //     io.to(k).emit('server::note', message)
      //   }
      // }
      socket.broadcast.emit('server::note', message);
    })
    console.log('Client connected.');
    // Disconnect listener
    io.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});
// SOCKET END



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
