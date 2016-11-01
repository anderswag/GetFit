"use strict";

const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const secureValue = "shhhhhhhhhh"

module.exports = (knex) => {

  router.post("/", (req, res) => {

    console.log(req.body.mentor)
    knex('users').where('id', jwt.verify(req.headers.authorization, secureValue).id)
    .update({
      mentor: req.body.mentor,
    }).then((results) => {
      res.json(results)
    })
  });

  router.get("/", (req, res) => {
    if(req.headers.authorization) {
      console.log(jwt.verify(req.headers.authorization, secureValue).id)
      knex('users')
      .where('id', jwt.verify(req.headers.authorization, secureValue).id)
      .select('mentor')
      .then((results) => {
        res.json(results)
      }) //knex('users').where('id', jwt.verify(req.headers["Authorization"], secureValue))
    }

  })

  return router;
}
