import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import countriesRouter from './routes/countries.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5008;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/countries', countriesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});