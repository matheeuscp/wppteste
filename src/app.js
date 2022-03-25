// import express from 'express';
const express = require('express');
const cors = require('cors');
// import routes from './routes';
// import cors from 'cors';
import './database'

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    // this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

//   routes() {
//     this.server.use(routes);
//   }
}

// export default new App().server;
module.exports =  new App().server;