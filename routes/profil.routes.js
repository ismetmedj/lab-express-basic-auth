const router = require("express").Router();
const User = require("../models/User.model");
const express = require("express");

router.get("/profil", (req, res, next) => {
  res.render("profil");
});

module.exports = router;
