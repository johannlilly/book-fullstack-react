import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import graffiti from '@risingstack/graffiti';
import schema from './schema';

import { Author, Book } from './models';

mongoose.Promise = global.Promise;

// set up example server
const app = express();
app.set('port', (process.env.API_PORT || 3001));

app.use(morgan('dev')); // logger

// parse body
app.use(bodyParser.json());
app.use(cors());

// attach graffiti-mongoose middleware
app.use(graffiti.express({
  schema
}));

// redirect all requests to /graphql
app.use(function redirect(req, res) {
  res.redirect('/graphql');
});

// if we have a MONGO_URI then use it to connect to mongo for real. Otherwise we're going to use mockgoose
if(process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI);
} else {
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.prepareStorage().then( () => {
    mongoose.connect('mongodb://localhost/graphql');
  });
}
export default app;
