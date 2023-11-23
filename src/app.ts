import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import { UserRoutes } from './app/modules/users/user.router';

const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes

app.use('/api/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getAController);

export default app;
