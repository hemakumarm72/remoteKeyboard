import applicationRouter from './router.js';

import express from 'express';
import cors from 'cors';
import { db } from './db.js';
export const config = async (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));

  applicationRouter(app); // TODO: router
  const connection = db.getConnection();
  connection.then(() => {
    console.log('successfully db connected');
  });
};
