const router = require("express").Router();
const User = require("../models/User.model");
const express = require("express");
const bcrypt = require("bcryptjs");

/* GET log In page */
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.render("login", {
        errorMessage: "Please fill out all of the fields!",
      });
    }
    const { username, password } = req.body;

    const foundUser = await User.findOne(
      { username: username }
      // { password: 1, username: 1 }
    );

    if (!foundUser) {
      return res.render("login", {
        errorMessage: "Please sign up first!",
      });
    }

    const matchingPass = await bcrypt.compare(password, foundUser.password);
    if (!matchingPass) {
      return res.render("login", {
        errorMessage: "Invalid credentials!",
      });
    }

    res.render("profil", { foundUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
