import express, {json, urlencoded} from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import cors from 'cors';
import news from './controllers/news.js';
import handleStats from './controllers/stats.js';

const users = [
  {
    username: "Jim",
    email: "jim@gmail.com",
    password: "test"
  },
  {
    username: "Ann",
    email: "ann@gmail.com",
    password: "test1"
  },
  {
    username: "Tom",
    email: "tom@gmail.com",
    password: "test2"
  }
]

const app = express();

app.use(json());
app.use(urlencoded({extended:false}));
app.use(cors());

app.get('/', (req, res) => {
    res.json({msg: "you made it"})
})

app.post('/signin', (req, res) => {
    const user = users.find((data) => {
      return data.email === req.body.email;
    })
    if (!user || user.password != req.body.password) {
      return res.status(400).json("incorrect credentials")
    }
    return res.status(200).json("success")
})

// NEWS end-points
app.get('/ndtv', (req, res) => {news.specificNews(req, res, fs)})
app.get('/news', (req, res) => {news.allNews(req, res, fs)})

app.get('/:time', (req, res) => handleStats(req, res, fs));

app.listen(3000);
