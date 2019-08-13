const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dbconfig = require("../config/database");
const mysql = require("mysql");
//mysql.createConnection(dbconfig.connection);

//Use config file
var con = mysql.createConnection(dbconfig.connection);
con.query('USE ' + dbconfig.database);

router.get("/profile", function(req, res, next) {
  res.send(req.user);
});

router.post("/changeinfo", function(req, res, next) {
  //Info from post request
  let username = req.body.username;
  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  let email = req.body.email;

  let sql = `UPDATE users SET first_name = '${firstName}', last_name = '${lastName}', email = '${email}' WHERE username = '${username}'`;
  con.query(sql, function(err, result) {
    if(err) throw err;
  });

  res.sendStatus(200);
});

router.post("/changepass", function(req, res, next) {
  //Info from post request
  let username = req.body.username;
  let password = req.body.password;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      password = hash;
      con.query(
        `UPDATE users SET password = '${password}' WHERE username = '${username}'`
      );
    });
  });
  
  res.sendStatus(200);
});

module.exports = router;
