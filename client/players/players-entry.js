const players = require('./players');
const client = require('./players-client');

const onInitialLoad = function(data) {
  const nav = document.querySelector('#players-list');

  const loadButton = document.createElement('button');
  loadButton.setAttribute('onclick', 'loadMore();');
  loadButton.innerText = 'Load more';
  nav.appendChild(loadButton);
  
  players.appendTo(document.querySelector('#players-list ul'), data);
};

client.fetchPlayers(onInitialLoad);

const addPlayerData = function(id) {
  client.getPlayer(String(id), (json) => {
    players.playerData(document.querySelector('#player'), id, json);
  });
};

let page = 1;
const loadMore = function() {
  page++;

  client.fetchPlayers(function(data) {
    if (!data.next) {
      document.querySelector('#players-list > button').style.display = 'none'; 
    }
    players.appendTo(document.querySelector('#players-list ul'), data);
  }, page);
};

window.addPlayerData = addPlayerData;
window.loadMore = loadMore;

players.ifIdExist(window.location.hash, id => addPlayerData(id));
