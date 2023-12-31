import { Router } from 'express';

import { register, login, getMe, updateUser } from '../controlers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

// Register
// http://localhost:3000/api/auth/register
router.post('/register', register);

// Login
// http://localhost:3000/api/auth/login
router.post('/login', login);

// Update user
// http://localhost:3000/api/auth/update
router.patch('/update', checkAuth, updateUser);

// Get me
// http://localhost:3000/api/auth/me
router.get('/me', checkAuth, getMe);

export default router;