import axios, { AxiosRequestConfig, Method } from "axios";

const request = async (method) => {
  const requestOptions = {
    method,
    baseURL: "https://nvision.nipa.cloud/api/v1/object-detection",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios(requestOptions);
    return res;
  } catch (e) {
    throw e;
  }
};

const get = (endpoint, requestOptions) =>
  request("GET", endpoint, requestOptions);

export default { get };
