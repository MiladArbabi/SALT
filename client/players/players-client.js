const config = require('./config');
const host = window.location.protocol + '//' + window.location.hostname;
const port = window.location.port;
const base = port ? host + ':' + port : host;

function fetchPlayers(callback, page) {
  if (!page) {
    page = 1;
  }

  fetch(base + config.resource_path + '?page=' + page)
    .then(res => res.json())
    .then(json => callback(json));
}

function getPlayer(uri, callback) {
  fetch(`${base}${config.resource_path}/${uri}`)
    .then(res => res.json())
    .then(json => callback(json));
}

module.exports.fetchPlayers = fetchPlayers;
module.exports.getPlayer = getPlayer;
