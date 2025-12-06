import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dbService from 'services/db.service';
const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  }),
);

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.listen(process.env.APP_PORT, () => {

  dbService.sync({ alter: process.env.ENVIROMENT === 'development' });

  console.log(`Api online. http://localhost:${process.env.APP_PORT}`);
});