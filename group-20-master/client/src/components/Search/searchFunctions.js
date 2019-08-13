import axios from "axios";

const ROOT_URL = "http://localhost:5000/search";

export const sendKey = key => {
  return axios
    .post(`${ROOT_URL}`, {
      searchKey: key
    })
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch(err => {
      console.log("Search Key send error.");
      console.log(err);
    });
};

export const saveItem = (item, targetprice, username) => {
  if(item.title.length > 100) {
    item.title = item.title.substring(1, 100);
  }

  let newPrice = item.price.split('$');
  item.price = newPrice[1];

  return axios
      .post(`${ROOT_URL}/save`, {
          title: item.title,
          price: item.price,
          url: item.url,
          image: item.image,
          username: username,
          targetprice: targetprice,
      })
      .then(response => {
          if (response.status === 200) {
              console.log("Response: " + JSON.stringify(response.data));
              return response.data;
          }
      })
      .catch (err => {
          console.log("Save Item Error!")
          console.log(err);
      })
}

export const buyItem = (item, username) => {
  if(item.title.length > 100) {
    item.title = item.title.substring(1, 100);
  }

  let config = {
    headers: {
        Authorization: "Bearer " + localStorage.usertoken,
    }
}

  let newPrice = item.price.split('$');
  item.price = newPrice[1];

  return axios
      .post(`http://localhost:5000/spending/buy`, {
          title: item.title,
          price: item.price,
          url: item.url,
          username: username,
      }, config)
      .then(response => {
          if (response.status === 200) {
              console.log("Response: " + JSON.stringify(response.data));
              return response.data;
          }
      })
      .catch (err => {
          console.log("Buy Item Error!")
          console.log(err);
      })
}


