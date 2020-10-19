import config from "../config";

const UserService = {
  postAddress({ user_name, address }) {
    return fetch(`${config.API_ENDPOINT}/users/saveaddress`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_name, address }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteAllAddresses(user_name) {
    return fetch(`${config.API_ENDPOINT}/users/addresses`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_name }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  deleteOneAddress(user_name, address) {
    return fetch(`${config.API_ENDPOINT}/users/address`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_name, address }),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
};

export default UserService;
