const express = require("express");
const router = express.Router();
const dbconfig = require("../config/database");
const mysql = require("mysql");

//Use config file
var con = mysql.createConnection(dbconfig.connection);

con.query("USE " + dbconfig.database);

router.get("/", function(req, res, next) { 
  let sql = `SELECT * FROM ${dbconfig.bought_table} WHERE username='${req.user.username}'`;
   con.query(sql, function(err, result) {
     if(err) throw err;
     res.send(result);
   });
  
});

router.post("/buy", function(req, res, next) {
   //Info from post request
   let username = req.body.username;
   let title = req.body.title;
   let price = req.body.price;
   let url = req.body.url;
 
   let sql = `INSERT INTO ${dbconfig.bought_table} (itemname, link, price, username) VALUES ('${title}', '${url}', '${price}', '${username}')`;
   con.query(sql, function(err, result) {
     if(err) throw err;
   });
 
   res.sendStatus(200);
});

module.exports = router;
