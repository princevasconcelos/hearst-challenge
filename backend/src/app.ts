import express from 'express';
import cors from './cors';
import { setupRoutes } from './api/routes';

const app = express();
app.use(cors)

setupRoutes(app)

export default app;