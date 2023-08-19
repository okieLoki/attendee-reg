import express from 'express';
import auth from '../middleware/auth';
import { registerAttendee, checkInAttendee } from '../controller/attendeeController';

const router = express.Router();

router.post('/', registerAttendee);
router.patch('/checkin/:id', auth, checkInAttendee);

export { router as attendeeRoute}