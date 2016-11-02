"use strict";

const express = require('express');
const router  = express.Router();
const jwt = require('jsonwebtoken');
const secureValue = "shhhhhhhhhh"

module.exports = (knex) => {

  router.get("/", (req, res) => {
    if(req.headers.authorization) {
      console.log(jwt.verify(req.headers.authorization, secureValue).id)
      knex('users')
      .where('id', jwt.verify(req.headers.authorization, secureValue).id)
      .select('first_name','last_name','picture','username')
      .then((results) => {
        res.json(results)
      }) //knex('users').where('id', jwt.verify(req.headers["Authorization"], secureValue))
    }
  })

  return router;
}
