import express from 'express';
import  cors  from 'cors';

import { cardsRouter } from './routes/routes.js';

export const app = express();

app.use('/card', cardsRouter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));