const express = require('express'),
  routescan = require('express-routescan'),
  bodyParser = require('body-parser'),
  PropertiesReader = require('properties-reader'),
  path = require('path'),
  cors = require('cors');
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Globals

global._base = __dirname + '/';
global._db = PropertiesReader(_base + 'resources/db.properties');
global._env = app.get('env');
global._isDev = _env === 'development';
global._isProd = _env === 'production';

console.info = function(message) {
  console.log('[INFO] ' + message);
};

console.debug = function(message) {
  console.log('[DEBUG] ' + message);
};

console.critical = function(message) {
  console.log('[!!! CRITICAL !!!] ' + message);
};

const setUpDatabase = require(_base + 'services/SetupDatabaseService');

setUpDatabase();

routescan(app, {
  ignoreInvalid: true
});
app.use('/build', express.static('dist'));
app.use('/src/assets', express.static('src/assets'));
app.use('/uploads', express.static('uploads'));
app.use((req, res) => res.sendFile(path.join(_base, '/build/index.html')));

app.use(function(err, req, res, next) {
  console.debug('Error encountered: ' + err.message);
  console.error(err);
  res.json({ error: err.message });
});

app.listen(3001, () => {
  console.log('API listening on port 3001');
});
