import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchAllCountries = async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
};

export const fetchCountryByName = async (name) => {
  const response = await axios.get(`${BASE_URL}/name/${name}`);
  return response.data[0];
};