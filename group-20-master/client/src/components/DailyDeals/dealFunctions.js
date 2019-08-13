import axios from 'axios';

const ROOT_URL = 'http://localhost:5000';

export const getItems = () => {
    return axios
        .get(`${ROOT_URL}/deals`)
        .then(response => {
            if (response.status === 200) {
                console.log("Response: " + JSON.stringify(response.data));
                return response.data;
            }
        })
        .catch (err => {
            console.log("Deal Error!")
            console.log(err);
        })
}