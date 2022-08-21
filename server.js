import express, {json, urlencoded} from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import cors from 'cors';
import news from './controllers/news.js';
import handleStats from './controllers/stats.js';
import handleSignin from './controllers/signin.js';
import handleRegister from './controllers/register.js';
import knex from 'knex';
import bcrypt from 'bcryptjs';



const app = express();

app.use(express.static('public'));
app.use(json());
app.use(urlencoded({extended:false}));
app.use(cors());

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

const findUser = async (input) => {
  try {
      const response = await postgres('users').where('email', input)
      if (response[0].email) return true
    } catch (err) {
      return false;
    }
}

app.get('/dashboard', (req, res) => {

  return res.status(200).json({img: "sdfs"})
});

app.get('/', (req, res) => {
    res.json({msg: "you made it"})
})

//SIGN IN
app.post('/signin', (req, res) => {handleSignin(req, res, postgres, bcrypt, findUser)})

//REGISTER
app.post('/register', (req, res) => {handleRegister(req, res, postgres, bcrypt, findUser)})

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