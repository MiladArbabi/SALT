const https = require('https');

const base = 'https://swapi.co/api/';

function fetchAll(callback) {
  get(base + 'people/', callback);
}

function getPlayer(id, callback) {
  get(base + 'people/' + id + '/', callback);
}

function getTeamFor(id, callback) {
  getPlayer(id, (data)=> {
    const homeworld = data.homeworld;
    get(homeworld, (worldData) => {
      callback(worldData);
    });
  });
  console.log(id);
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
