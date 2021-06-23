const axios = require("axios");

const instanceAxios = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 20000,
});

export const getCafe = () => {
  return instanceAxios.get("cafe/");
};

export const getCafeInPage = (index) => {
  return instanceAxios.get("cafe/" + index);
}

export const getNumberOfPages = () => {
  return instanceAxios.get("countCafes/");
}

export const getSelectedCafes = (body) => {
  return instanceAxios.post("cafeSelected/", body);
}

export const getSelectedCityCafes = (body) => {
  return instanceAxios.post("cafeCitySelected", body);
}

export const getNumberCitySelectedCafes = (body) => {
  return instanceAxios.post("countSelectedCityCafes/", body);
}

export const getNumberSelectedCafes = (body) => {
  return instanceAxios.post("countSelectedCafes/", body);
}