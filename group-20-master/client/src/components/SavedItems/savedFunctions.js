import axios from "axios";

const ROOT_URL = "http://localhost:5000";

export const loadData = () => {
  //An instance of axios that contains the user token in the header of all requests
  const instance = axios.create({
    baseURL: ROOT_URL,
    timeout: 10000,
    headers: { Authorization: "Bearer " + localStorage.usertoken }
  });
  return instance
    .get(`${ROOT_URL}/saveditems`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Request Error!");
      console.log(err);
    });
};

export const removeData = itemName => {
  //An instance of axios that contains the user token in the header of all requests
  const instance = axios.create({
    baseURL: ROOT_URL,
    timeout: 10000,
    headers: { Authorization: "Bearer " + localStorage.usertoken }
  });
  return instance
    .post(`${ROOT_URL}/saveditems/removeitem`, {
      title: itemName
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Request Error!");
      console.log(err);
    });
};
