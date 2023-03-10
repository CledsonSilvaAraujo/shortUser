import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import utilLogger from './library/Logger';
import { config } from './config/config';
import userRoutes from './routes/User'
import db from './infra/db'
const router = express();


const StartServer = () => {
  db.connect();
  router.use((req, res, next) => {
    console.log(`Incoming -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] `)
    // utilLogger.Log(`Incoming -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] `);
    res.on('finish', () => {
    //   utilLogger.Log(`finish -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status [${res.statusCode}]`);
    console.log(`finish -> Method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status [${res.statusCode}]`)
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    }
    next();
  });


  router.use('/user/', userRoutes);

  router.get('/foo', (req, res, next) => res.status(200).json({ message: 'bar'}));

  router.use((req, res, next)=>{
    const error = new Error('not found');
    return res.status(404).json({ message: error.message});
  })

  http.createServer(router).listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
  })
};

StartServer();