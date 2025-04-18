import express from 'express';
import * as controller from './keyboard.controller.js';
const router = express();

router.get('/', controller.getStatus);
router.put('/toggle', controller.toggle);
router.put('/control', controller.control);

export default router;
