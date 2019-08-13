const express = require("express");
const router = express.Router();
const scrape = require("../puppeteer/scrape");
const mysql = require("mysql");
const dbconfig = require("../config/database");

var con = mysql.createConnection(dbconfig.connection);
con.query('USE ' + dbconfig.database);


//Takes search key and scrapes websites
router.post("/", (req, res, next) => {
  let results = [];
  let singleArray = [];
  let searchKey = req.body.searchKey;
  scrape
    .Amazon(searchKey)
    .then(items => {
      results.push(items);
    })
    .then(() => {
      scrape.Walmart(searchKey).then(items => {
        results.push(items);
      });
    })
    .then(() => {
      scrape.BestBuy(searchKey).then(items => {
        results.push(items);
          results.map(arr => {
              arr.map(item => {
                  singleArray.push(item);
              })
          })
          console.log(singleArray);
          res.send(singleArray);
      });
    })
	.catch(err => {
      console.log(`Couldn't load items ${err}`);
    });
	    
});

router.post("/save", (req, res, next) => {
  
  let username = req.body.username;
  let title = req.body.title;
  let price = req.body.price;
  let url = req.body.url;
  let image = req.body.image;
  let targetprice = req.body.targetprice;

  let sql = `INSERT INTO ${dbconfig.search_table} (itemname, link, imagelink, price, targetprice, username) VALUES ('${title}', '${url}', '${image}', '${price}', '${targetprice}', '${username}')`

  con.query(sql, function(err, result) {
    if(err) throw err;
  });
  console.log(req.body);

  res.sendStatus(200);
});

module.exports = router;
      