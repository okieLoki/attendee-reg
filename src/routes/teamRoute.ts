import express from 'express';
import { registerTeam, loginTeam } from '../controller/teamController';

const router = express.Router();

router.post('/login', loginTeam);
router.post('/register', registerTeam);

export { router as teamRoute}