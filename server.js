const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");

connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

const users = require("./routes/users");
const contacts = require("./routes/contacts");
const auth = require("./routes/auth");

app.use("/api/users", users);
app.use("/api/contacts", contacts);
app.use("/api/auth", auth);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`);
});
