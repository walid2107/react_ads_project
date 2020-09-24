const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const ads = require("./routes/api/ads");

const app = express();
// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongo_URI;

// Connecting to mongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// use routes
app.use("/api/users", users);
app.use("/api/ads", ads);

// Setting environement
port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) console.log("error server");
  console.log(`Server is running on port ${port}... `);
});
