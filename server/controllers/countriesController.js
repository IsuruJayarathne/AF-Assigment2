import { fetchAllCountries, fetchCountryByName } from '../services/countriesService.js';

export const getAllCountries = async (req, res) => {
  try {
    const countries = await fetchAllCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCountryByName = async (req, res) => {
  try {
    const { name } = req.params;
    const country = await fetchCountryByName(name);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};