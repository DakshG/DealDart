//https://stackoverflow.com/questions/49529959/using-react-to-render-flash-messages-from-express
import axios from "axios";

const ROOT_URL = "http://localhost:5000";

export const signUp = user => {
  return axios
    .post(`${ROOT_URL}/signup`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password
    })
    .then(response => {
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    })
    .catch(err => {
      console.log("Sign up Error!");
      console.log(err);
    });
};

export const login = user => {
  return axios
    .post(`${ROOT_URL}/login`, {
      username: user.username,
      password: user.password
    })
    .then(response => {
      if (response.status === 200) {
        console.log("Response: " + JSON.stringify(response.data));
        //Save token in local storage
        localStorage.setItem("usertoken", response.data.token);
        return response.data;
      }
    })
    .catch(err => {
      console.log("Login Error!");
      console.log(err);
    });
};

export const loadUserData = () => {
  //An instance of axios that contains the user token in the header of all requests
  const instance = axios.create({
    baseURL: ROOT_URL,
    timeout: 10000,
    headers: { Authorization: "Bearer " + localStorage.usertoken }
  });
  return instance
    .get(`${ROOT_URL}/user/profile`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log("Request Error!");
      console.log(err);
    });
};
