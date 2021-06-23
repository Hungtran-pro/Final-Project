const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5000;
const { MONGOURI } = require("./keys");
app.use(cors());

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo!");
});

mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));
app.use(require("./routes/cafeManage"));

app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
