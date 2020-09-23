const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
//@route    POST api/users
//@desc     Register a User
//@access   Public
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("Passed");
  }
);

module.exports = router;
