import { Router } from 'express';

import { addSerial, getMySerials, removeSerial, editSerial } from '../controlers/serial.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// Add serial
// http://localhost:3000/api/serial/add
router.post('/add', checkAuth, addSerial);

// Remove serial
// http://localhost:3000/api/serial/:id
router.delete('/:id', checkAuth, removeSerial);

// Edit serial
// http://localhost:3000/api/serial/:id
router.put('/:id', checkAuth, editSerial);

// My serials
// http://localhost:3000/api/serial/all
router.get('/all', checkAuth, getMySerials);

export default router;