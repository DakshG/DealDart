const express = require("express");
const router = express.Router();
const dbconfig = require("../config/database");
const mysql = require("mysql");

//Use config file
var con = mysql.createConnection(dbconfig.connection);

con.query("USE " + dbconfig.database);

router.get("/", function(req, res, next) {
  let sql = `SELECT * FROM saved_searches WHERE username='${
    req.user.username
  }'`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post("/removeitem", function(req, res, next) {
  let sql = `DELETE FROM saved_searches WHERE itemname='${req.body.title}'`;
  con.query(sql, function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = router;
