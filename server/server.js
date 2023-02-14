import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); //less hackers know about our stack

const port = 8080;

// HTTP GET REQUEST
app.get('/', (req, res) => {
  res.status(201).json('HOME GET REQUEST');
});

// api routes
app.use('/api', router);

// Start Server only when we have valid connection to database
connect().then(() => {
  try {
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  } catch (error) {
    console.log('cannot connect to the server');
  }
});
