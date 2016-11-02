"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .orderBy('score', 'desc')
      .where('mentor', true)
      .then((results) => {
        res.json(results);
    });
  });
  router.post("/", (req, res) => {
    if(req.body.direction === "up"){
      knex
      .select("*")
      .from("users")
      .returning('*')
      .where({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gym: req.body.gym,
      }).increment('score',1)
      .then((results) => {
        res.json(results)
      })
    }
    else if (req.body.direction ==="down") {
      knex
      .select("*")
      .from("users")
      .returning("*")
      .where({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gym: req.body.gym,
      }).decrement('score',1)
      .then((results) => {
        res.json(results)
      })
    }
  })

  return router;
}
