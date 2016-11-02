"use strict";

const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const secureValue = "shhhhhhhhhh"

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
      picture: req.body.picture,
      score: 0

      })
      .then((results) => {
        knex('users').where({
          username: req.body.username,
          email: req.body.email
        }).select('*')
          .then((results) => {
            if(results.length === 0) {
              res.status(401)
              return
            }
            results = results[0];
            res.json({
              user:results,
              token: jwt.sign({id: results.id}, secureValue)
            })
          })
        // results = results[0];
        // res.json({
        //   user:results,
        //   token: jwt.sign({id: results.id}, secureValue)
        // });
        console.log(results);
    });
  });

  return router;
}
