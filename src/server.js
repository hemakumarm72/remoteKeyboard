import 'dotenv/config';
import express from 'express';
import { config } from './config/config.js';

const app = express();

config(app);

app.listen(3000, () =>
  console.log('Server running at http://localhost:3000/api')
);
