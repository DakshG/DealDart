const express = require("express");
const router = express.Router();
const $ = require("cheerio");
const axios = require("axios");


router.get("/", function(req, res, next) {
  //SCRAPE BESTBUY DEALS
  axios.get('https://www.bestbuy.com/site/misc/deal-of-the-day/pcmcat248000050016.c?id=pcmcat248000050016')
    .then(function (response) {
      let data = $('.row .offer-row', response.data);

      let items = [];
      let images = [];
      let prices = [];
      let count = 0;

      $('.priceView-hero-price', data).each((i, elem) => {
        let temp = $(elem).text();
        if(i >= 0) {
          prices.push(temp.substring(0, 9).match(/[0-9.]+/));
        }
      });

      $('a', data).each((i, elem) => { 
        let temp = $(elem).text();
        let link = $(elem).attr("href");
        let imageHtml = $(elem).html();

        if($(imageHtml).attr("data-src") != null) {
          let temp = $(imageHtml).attr("data-src");
          temp = temp.split(";");
          images.push(temp[0]);
        }

        if(temp != '') {
          if(!temp.startsWith("Rating") ^ !temp.startsWith("50%") ^ !temp.startsWith("Shop")) { //Removes the garbage links
            let item = {
              title: temp,
              link: "http://bestbuy.com" + link,
              image: images[count], //Can't use i as BestBuy doesn't store the image with the link.
              price: prices[count],
            }
            console.log(item);
            items.push(item);
            count++;
          }
        }
      });

      res.send(items);
    });

});

module.exports = router;
