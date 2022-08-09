import express, {json, urlencoded} from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import news from './controllers/news.js'

const url = 'https://top-nft-collections-and-sales.p.rapidapi.com/sales/1d';


const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '837dc6b60amsh7c39ed5f163c497p15734ejsn48d377555198',
    'X-RapidAPI-Host': 'top-nft-collections-and-sales.p.rapidapi.com'
  }
};

const app = express();
app.use(json());
app.use(urlencoded({extended:false}));


app.get('/', (req, res) => {
    res.json({msg: "you made it"})
})

app.post('/hello', (req, res) => {
    console.log(req.body)
    res.send(req.body.name)
})

// NEWS end-points
app.get('/ndtv', (req, res) => {news.specificNews(req, res, fs)})
app.get('/news', (req, res) => {news.allNews(req, res, fs)})

app.listen(3000);
