const specificNews = (req, res, fs) => {
    fs.readFile('./data/news/ndtv.json', (err, data) => {
        if (err) {
          res.status(400).json('failure reading file', err);
          return;
        }
    
        res.json(JSON.parse(data.toString()))
      })
    
}

const allNews = (req, res, fs) => {
    fs.readFile('./data/news/news.json', (err, data) => {
        if(err) {
          res.status(400).json('failure reading file', err);
          return;
        }
    
        res.json(JSON.parse(data.toString()))
      })
}

export default {specificNews, allNews}