import axios from "axios";
// import { delete } from "request";

const setAuthToken = (token) => {
  console.log(token);

  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
