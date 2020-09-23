const express = require("express");
const router = express.Router();

//@route    POST api/contacts
//@desc     Register a User
//@access   Private
router.post("/", (req, res) => {
  res.send("Register a User");
});

//@route    GET api/contacts
//@desc     Get All contacts
//@access   Private
router.get("/", (req, res) => {
  res.send("Get all contacts");
});

//@route    GET api/contacts/:id
//@desc     Update Contact
//@access   Private
router.put("/:id", (req, res) => {
  res.send("Update Contact");
});

//@route    GET api/contacts/:id
//@desc     Delete contact
//@access   Private
router.delete("/", (req, res) => {
  res.send("Delete Contact");
});
module.exports = router;
