import express from 'express';
import hobbie from './hobbie';
import user from './user';

const router = express.Router();

// Mount the 'hobbie' and 'user' routes on specific paths
router.use('/hobbies', hobbie);
router.use('/users', user);

export default router;
