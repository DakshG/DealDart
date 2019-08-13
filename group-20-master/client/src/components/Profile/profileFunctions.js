import axios from 'axios';

const ROOT_URL = 'http://localhost:5000/user';

export const changeInfo = (user) => {
    let config = {
        headers: {
            Authorization: "Bearer " + user.token,
        }
    }

    return axios
        .post(`${ROOT_URL}/changeinfo`, {
            username: user.username,
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
        }, config)
        .then(response => {
            if (response.status === 200) {
                console.log("Response: " + JSON.stringify(response.data));
                return response.data;
            }
        })
        .catch (err => {
            console.log("Change Info Error!")
            console.log(err);
        })
}

export const changePass = (user) => {
    let config = {
        headers: {
            Authorization: "Bearer " + user.token,
        }
    }

    return axios
        .post(`${ROOT_URL}/changepass`, {
            username: user.username,
            password: user.password,
        }, config)
        .then(response => {
            if (response.status === 200) {
                console.log("Response: " + JSON.stringify(response.data));
                return response.data;
            }
        })
        .catch (err => {
            console.log("Change Pass Error!")
            console.log(err);
        })
}