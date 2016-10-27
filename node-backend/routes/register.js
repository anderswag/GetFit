"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/", (req, res) => {
    console.log(req.body)
    knex('users').insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      gym: req.body.gym,
      password: req.body.password,
      picture: req.body.picture
      })
      .then((results) => {
        console.log(results)
        res.json(results);
    });
  });

  return router;
}
