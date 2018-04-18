const shortUrl = require('node-url-shortener');
const urlExists = require('url-exists');
const utilities = require('../library/utilities');

module.exports = function(app, db) {
  const urlError = {
    "Error": "Please make sure you have a correct URL format." ,
    "Example": 'http(s)://www.(domain name).(top level, e.g. .com)'
  };

  app.get('/', (req, res) => {
    res.sendFile('index.html', {
      root: './public/views'
    });
  });

  app.get('/shorten/*', (req, res) => {
    const url = utilities.shorten(req, res);
    urlExists(url, (err, exists) => {
      if (err) {
        res.send(err);
      }
      if (exists) {
        shortUrl.short(url, (err, result) => {
          if (err) {
            res.send(err);
          }
          let shortenUrl = utilities.reduceShortUrl(result);
          let urlDetails = { 'regular url': url, 'shorten url': shortenUrl };
          res.send(urlDetails);
        });
      } else {
        res.send(urlError);
      }
    });
  });

  app.get('/*', (req, res) => {
    const url = 'https://is.gd/' + req.params[0];
    urlExists(url, (err, exists) => {
      if (err) res.send(err);
      if (exists) {
        res.redirect(url);
      } else {
        res.send(urlError);
      }
    });
  });
};
