const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const users = require("./routes/users");
const contacts = require("./routes/contacts");
const auth = require("./routes/auth");

app.use("/api/users", users);
app.use("/api/contacts", contacts);
app.use("/api/auth", auth);

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`);
});
