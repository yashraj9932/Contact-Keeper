const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}`);
});
