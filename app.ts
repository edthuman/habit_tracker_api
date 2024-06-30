import express from 'express';
import { getEndpoints } from './controllers/api.controllers';

const app = express()

app.get("/", getEndpoints);

export default app