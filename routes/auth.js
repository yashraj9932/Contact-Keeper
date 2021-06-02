const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const { login, getUser } = require("../controllers/auth");

router.get("/", auth, getUser);

router.post(
  "/",
  [
    check("email", "Please Enter Valid Email").isEmail(),
    check("password", "Password is Required").exists(),
  ],
  login
);
module.exports = router;
