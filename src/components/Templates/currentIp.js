import axios from "axios";

export const getIp = () => {
    return axios
      .get("https://httpbin.org/ip", null)
      .then((res) => {
        return res.data.origin;
      })
      .catch((err) => {
        alert("error get ip: " + err);
      });
  };