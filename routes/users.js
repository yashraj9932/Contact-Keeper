const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const User = require("../models/User");
const { register } = require("../controllers/users");

router.post(
  "/",
  [
    check("name", "Please Enter Name").not().isEmpty(),
    check("email", "Please Include A Valid Email").isEmail(),
    check(
      "password",
      "Please Enter A Password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  register
);

module.exports = router;
