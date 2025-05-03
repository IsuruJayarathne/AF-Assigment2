import express from 'express';
import { getAllCountries, getCountryByName } from '../controllers/countriesController.js';

const router = express.Router();


router.get('/', getAllCountries);
router.get('/:name', getCountryByName);
  


export default router;