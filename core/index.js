import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import passport from 'passport';
import routes from './routes/index';
import { initDb, db } from './db';



require('dotenv').config({path: 'variables.env'});



  const app = express();

  app.set('views', path.join(__dirname, 'views')); 
  app.set('view engine', 'pug');

  app.use(express.static(path.join(__dirname, 'static')));

  app.use('/adminFiles', express.static(__dirname + '/admin/dist/'))


  app.use(cors());
  app.set('db', db);
  

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

