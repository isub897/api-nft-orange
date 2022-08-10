// amount represents the number of stroies we want to send to the front end
const amount = 7;

const specificNews = (req, res, fs) => {
    fs.readFile('./data/news/ndtv.json', (err, data) => {
        if (err) {
          res.status(400).json('failure reading file', err);
          return;
        }
    
        res.json(JSON.parse(data.toString()).slice(0, amount))
      })
    
}

const allNews = (req, res, fs) => {
    fs.readFile('./data/news/news.json', (err, data) => {
        if(err) {
          res.status(400).json('failure reading file', err);
          return;
        }
    
        res.json(JSON.parse(data.toString()).slice(0, amount))
      })
}

export default {specificNews, allNews}