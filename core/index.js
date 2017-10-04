import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import next from 'next';
import routes from './routes/index';
import { initDb, db } from './db';
import copy from './scripts/copy';


require('dotenv').config({path: 'variables.env'});
// Next config
const dev = process.env.NODE_ENV !== 'production';
const nextLoader = next({dev, dir: './site'});
const handle = nextLoader.getRequestHandler();


nextLoader.prepare().then(() => {

  const app = express();


  app.use(cors());
  app.set('db', db);
  app.nextRender = nextLoader;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  require('./config/passport')(passport);

  app.use('/', routes);

  copy();

  app.get('*', (req, res) => {
    return handle(req, res);
  });

  // START APP
  app.set('port', process.env.PORT || 1337);

  /**
   * No need to seed during this stage of development
   */
  if(!db.has('pages').value()) {
    initDb(db);
  }
  const server = app.listen(app.get('port'), () => {
    console.log(`Express running -> ${server.address().port}`);
    console.log
  });
});
