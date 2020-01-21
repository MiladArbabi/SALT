const https = require('https');

const base = 'https://swapi.co/api/';

function fetchAll(callback, page) {
  if (!page) {
    page = 1;
  }

  get(`${base}people/?page=${page}`, callback);
}

function getPlayer(id, callback) {
  get(base + 'people/' + id + '/', callback);
}

function getTeamFor(id, callback) {

  getPlayer(id, (data) => {

    get(data.homeworld, (worldData) => {
      callback(worldData);
    });

  });
}

function get(path, callback) {

  https.get(path, res => {

    let data = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      callback(JSON.parse(data));
    });
  });
}

module.exports.fetchAll = fetchAll;
module.exports.getPlayer = getPlayer;
module.exports.getTeamFor = getTeamFor;
