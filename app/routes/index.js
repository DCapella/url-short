const shortRoutes = require('./short_routes');

module.exports = function(app, db) {
  shortRoutes(app, db);
};
