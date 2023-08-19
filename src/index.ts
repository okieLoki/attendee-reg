import 'dotenv/config';
import express, {Express} from 'express';
import connectDb from './config/dbConfig';
import {teamRoute} from './routes/teamRoute';
import {attendeeRoute} from './routes/attendeeRoute';
import cors from 'cors';

const app: Express = express();

connectDb();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/team', teamRoute);
app.use('/attendee', attendeeRoute);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

