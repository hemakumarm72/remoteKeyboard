import express from 'express';
import keyboard from './keyboard/index.js';
const router = express();

router.use('/keyboards', keyboard);

export default router;
