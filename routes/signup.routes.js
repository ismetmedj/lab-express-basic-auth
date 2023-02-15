const router = require("express").Router();
const User = require("../models/User.model");
const express = require("express");
const bcrypt = require("bcryptjs");

/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.render("signup", {
        errorMessage: "Please fill out all of the fields!",
      });
    }
    const newUsername = {
      username: req.body.username,
      password: req.body.password,
    };

    const existedUser = await User.findOne({ username: newUsername.username });
    if (existedUser) {
      return res.render("signup", {
        errorMessage: "This username already exists, choose another one!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newUsername.password, salt);
    newUsername.password = hashedPassword;

    await User.create(newUsername);
    res.render("login");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
