"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    console.log(req.query.gym)

    knex
      .where({
        gym: req.query.gym,
        mentor: true,
      })
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
