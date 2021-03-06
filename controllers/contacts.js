const User = require("../models/User");
const Contact = require("../models/Contact");
const { validationResult } = require("express-validator");

//@route    POST api/contacts
//@desc     Register a Contact
//@access   Private

exports.postContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, phone, type } = req.body;
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id,
    });
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
//@route    GET api/contacts
//@desc     Get All contacts
//@access   Private

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//@route    GET api/contacts/:id
//@desc     Update Contact
//@access   Private

exports.updateContact = async (req, res) => {
  const { name, phone, email, type } = req.body;

  //Build Contact Object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  if (email) contactFields.email = email;
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send("Contact Not Found");

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//@route    DELETE api/contacts/:id
//@desc     Delete contact
//@access   Private

exports.deleteContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).send("Contact Not Found");

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorised" });
    }
    await contact.remove();

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
