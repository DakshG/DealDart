import axios from "axios";

const ROOT_URL = "http://localhost:5000";

export const sendMessage = msg => {
  return axios
    .post(`${ROOT_URL}/messages`, {
      sentBy: msg.sentBy,
      messageText: msg.messageText
    })
    .then(response => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch(err => {
      console.log("Chat Error!");
      console.log(err);
    });
};
