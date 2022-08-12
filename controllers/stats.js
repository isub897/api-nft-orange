const amount = 5;

const handleStats = (req, res, fs) => {
  
  fs.readFile(`./data/stats/collections/${req.params['time']}.json`, (err, data) => {
    if (err) {
      res.status(400).json('failure reading file', err);
      return;
    }
    res.json(JSON.parse(data.toString()).slice(0, amount))

  })
}

export default handleStats;


// `./controllers/TNCAS/response${req.params['time']}.json`