//https://github.com/GoogleChrome/puppeteer
const puppeteer = require("puppeteer");



//Amazon

async function scrapeAmazon(searchKey) {
    try {
        const url = `https://www.amazon.com/s?k=${searchKey}&ref=nb_sb_noss`;
        const browser = await puppeteer.launch({
            headless: true, args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920x1080',] });
        const page = await browser.newPage();
        
	  
	  await page.goto(url);
	  const results = await page.evaluate(() => {
		const res = [];
		const allItems = document.querySelectorAll(
		  "div.s-result-list div.s-result-item"
		);
		for (let i = 0; i < allItems.length; i++) {
		  //Must use 'for' loop since it is a Node List
		  const price = allItems
			.item(i)
			.querySelector("div.a-section a.a-size-base span.a-price");
		  if (price) {
			//If there is a price, look for title
			const title = allItems
			  .item(i)
			  .querySelector("div.a-section span.a-color-base"); //Get the first price item (the correct price comes before the crossed out one)
			const image = allItems.item(i).querySelector("img.s-image");
			const url = allItems.item(i).querySelector("a.a-link-normal");
			const logo = "https://amp.businessinsider.com/images/539f3ffbecad044276726c01-750-273.jpg";
			if(i < 6){
				res.push({
				  title: title.innerText,
				  price: price.innerText.split("\n")[0],
				  image: image.src,
				  url: url.href,
				  logo: logo
				});
			}
		  }
		}
		return res;
	  });
	  await browser.close();
	  console.log(results);
	return results;
	}
	catch(error){
	console.log(error);	
	}
  
}

//Walmart
async function scrapeWalmart(searchKey) {
    try {
        const url = `https://www.walmart.com/search/?cat_id=0&query=${searchKey}`;
        const browser = await puppeteer.launch({
            headless: true, args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920x1080',] });
        const page = await browser.newPage();
        
	  await page.goto(url);
	  const results = await page.evaluate(() => {
		const res = [];
		const allItems = document.querySelectorAll(
		  "div.search-result-listview-items div.search-result-listview-item"
		);
		for (let i = 0; i < allItems.length; i++) {
		  const price = allItems.item(i).querySelector("span.price-group");
		  const title = allItems.item(i).querySelector("a.product-title-link");
		  const image = allItems
			.item(i)
			.querySelector("div.search-result-productimage img");
			const logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPqDoCvgveNi6Nuq2Or0OCuNG5hSy4yiqgJMK-6NKTJJ72KnYbsQ";
			if(i < 6){
			  res.push({
				title: title.title,
				price: price.getAttribute("aria-label"),
				url: title.href,
				image: image.src,
				logo: logo
			  });
			}
		}
		return res;
	  });
	  await browser.close();
	  console.log(results);
	return results;
	}
	catch(error){
		console.log(error);
	}
}

async function scrapeBestBuy(searchKey) {
    try {
        const url = `https://www.bestbuy.com/site/searchpage.jsp?st=${searchKey}&_dyncharset=UTF-8&id=pcat17071&type=page&sc=Global&cp=1&nrp=&sp=&qp=&list=n&af=true&iht=y&usc=All+Categories&ks=960&keys=keys`;
        const browser = await puppeteer.launch({
            headless: true, args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--window-size=1920x1080'] });
        const page = await browser.newPage();
        

	  await page.goto(url);
	  const results = await page.evaluate(() => {
		const res = [];
		const allItems = document.querySelectorAll("div.shop-sku-list-item");
		for (let i = 0; i < allItems.length; i++) {
		  //Must use 'for' loop since it is a Node List
		  const price = allItems
			.item(i)
			.querySelector("div.priceView-hero-price,	 priceView-customer-price");
		  const title = allItems.item(i).querySelector("h4.sku-header a"); //Get the first price item (the correct price comes before the crossed out one)

        //const logo = document.querySelector("div.logo img");
        const image = allItems
          .item(i)
          .querySelector("div.image-column img.product-image");
          
        const logo =
          "http://www.logo-designer.co/wp-content/uploads/2018/05/2018-bestbuy-new-logo-design-4.png";
        if (i < 6) {
          res.push({
            title: title.innerText,
            price: price.innerText.split("\n")[0],
            url: title.href,
            image: image.src.split(";")[0],
            logo: logo
          });
        }
      }
      return res;
    });
    await browser.close();
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
}

module.exports.Amazon = scrapeAmazon;
module.exports.Walmart = scrapeWalmart;
module.exports.BestBuy = scrapeBestBuy;
