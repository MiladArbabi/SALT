function PlayersService(playersClient) {
  this.playersClient = playersClient;
}

PlayersService.prototype.all = function(callback) {

  this.playersClient.fetchAll(all => {
    const results = all.results.map(r => parsePerson(r));

    callback({
      count: all.count,
      next: all.next ? all.next.split('=')[1] : null,
      previous: pageNumber(all.previous),
      results: results,
    });
  });
};

PlayersService.prototype.get = function(id, callback) {

  this.playersClient.getPlayer(id, data => {
    const person = parseDetails(data);
    callback(person);
  });
};

function parsePerson(data) {
  return {
    name: data.name,
    eid: parseEid(data.url),
  };
}

function parseDetails(data) {
  return {
    name: data.name,
    gender: data.gender,
  };
}

function parseEid(url) {
  return url.replace(/\/$/, '')
    .split('/')
    .slice(-1)[0];
}

function pageNumber(p) {
  if (p) {
    return p.split('=')[1];
  }
  else return;
}

module.exports.create = remotePlayersClient => new PlayersService(remotePlayersClient);
