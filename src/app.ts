import http from 'http';
import express, { Express } from 'express';
import mainRouter from './router/main.router';
import { config } from './config';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';

const router: Express = express();
const dbURL = config.dbURL;
const options: ConnectOptions = { keepAlive: true, connectTimeoutMS: 30000 };

mongoose.connect(dbURL, options, (err) => {
  // eslint-disable-next-line no-console
  if (err) console.log(err);
});

/** Logging */
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(cors());
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With,Content-Type,Accept, Authorization'
  );
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }
  next();
});

/** Routes */
router.use('/', mainRouter);

/** Error handling */
router.use((req, res) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message
  });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 9090;
httpServer.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`The server is running on port ${PORT}`)
);
