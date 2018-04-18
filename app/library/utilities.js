module.exports.shorten = (req, res) => {
  let url = req.params[0];
  if (Object.keys(req.query).length) {
    return url + '?v=' + req.query['v'];
  }
  return url;
};

module.exports.reduceShortUrl = (url) => {
  url = url.replace('https://is.gd/', '');
  return url
};
