const express = require("express");
const router = express.Router();

//Tokens
const jwt = require("jsonwebtoken");

const passport = require("../config/passport/passport");

router.post("/login", (req, res, next) => {
  passport.authenticate(
    "local-login",
    { session: false },
    (err, user, info) => {
      if (!user) {
        console.log("Wrong password!");
        return null; //Fix for wrong password crashing server.
      }
      console.log(info.message);
      //Return token to react
      const token = jwt.sign(JSON.parse(JSON.stringify(user)), "ligma", {
        expiresIn: "1d"
      });
      return res.json({ user, token });
    }
  )(req, res, next);
});

router.post("/signup", (req, res, next) => {
  passport.authenticate("local-signup", (err, user, info) => {
    console.log(info.message);
    res.send(user);
  })(req, res, next);
});

module.exports = router;
