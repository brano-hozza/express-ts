import { authMiddleware } from '@/middlewares/auth';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import { ProductRouter } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use(authMiddleware);

new ProductRouter(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
