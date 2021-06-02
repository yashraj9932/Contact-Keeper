const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check } = require("express-validator");

const {
  getContacts,
  updateContact,
  deleteContact,
  postContact,
} = require("../controllers/contacts");

router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  postContact
);

router.get("/", auth, getContacts);

router.put("/:id", auth, updateContact);

router.delete("/:id", auth, deleteContact);

module.exports = router;
