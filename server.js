import express, {json, urlencoded} from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import cors from 'cors';
import news from './controllers/news.js';
import handleStats from './controllers/stats.js';
import handleSignin from './controllers/signin.js';
import handleRegister from './controllers/register.js';
import handleSession from './controllers/session.js';
import knex from 'knex';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import KnexSessionStore from 'connect-session-knex';
const knexSession = KnexSessionStore(session);

const app = express();

app.use(express.static('public'));
app.use(json());
app.use(urlencoded({extended:false}));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3001'
}));

const postgres = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'nft-orange'
  }
})

const store = new knexSession({
  knex: postgres,
  tablename: 'sessions', // optional. Defaults to 'sessions'
});

app.use(session({
  store: store,
  secret: 'some secret',
  resave: false,
  cookie: { secure: false,
            // maxAge: 30 * 60 * 1000},
            maxAge: 5 * 30 * 1000},
  saveUninitialized: false,
}))

const findUser = async (input) => {
  try {
      const response = await postgres('users').where('email', input)
      if (response[0].email) return true
    } catch (err) {
      return false;
    }
}

app.get('/', (req, res) => {
    res.json({msg: "you made it"})
})

app.get('/session', (req, res) => {handleSession(req, res, postgres, session)})

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if(err) {res.status(400).json("failure")}
  })
  res.json(true)
})

//SIGN IN
app.post('/signin', (req, res) => {handleSignin(req, res, postgres, bcrypt, findUser, session)})

//REGISTER
app.post('/register', (req, res) => {handleRegister(req, res, postgres, bcrypt, findUser, session)})

// NEWS end-points
app.get('/ndtv', (req, res) => {news.specificNews(req, res, fs)})
app.get('/news', (req, res) => {news.allNews(req, res, fs)})

// Stats
app.get('/:time', (req, res) => handleStats(req, res, fs));

app.listen(3000);


// const users = [
//   {
//     username: "Jim",
//     email: "jim@gmail.com",
//     password: "test"
//   },
//   {
//     username: "Ann",
//     email: "ann@gmail.com",
//     password: "test1"
//   },
//   {
//     username: "Tom",
//     email: "tom@gmail.com",
//     password: "test2"
//   }
// ]