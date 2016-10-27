"use strict";

const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const secureValue = "shhhhhhhhhh"


module.exports = (knex) => {

  router.post("/", (req, res) => {
    console.log(req.body)
    knex('users').where({
      username: req.body.login_username,
      password: req.body.login_password,
    }).select('*')
      .then((results) => {
        if(results.length === 0) {
          res.status(401)
          return
        }
        results = results[0];
        res.json({
          user: results,
          token: jwt.sign({id: results.id}, secureValue)
        });
    });
  });

  return router;
}
