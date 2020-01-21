function appendTo(element, quote) {
  element.innerHTML += asHtml(quote);
}

function playerData(element, id, data) {
  const elements = [];
  elements.push(`<p>Name: ${data.name}</p>`);
  elements.push(`<p>Gender: ${data.gender}</p>`);
  elements.push(`<p>Team: ${data.team}</p>`);
  element.innerHTML = elements.join('');
  window.history.pushState(null, null, `#id=${id}`);
}

function ifIdExist(hash, callback) {
  if (hash) {
    const param = hash.slice(1)
      .split(';')
      .filter(p => p.startsWith('id='));
    if (Array.isArray(param) && param.length > 0) {
      const id = param[0].split('=')[1];
      callback(id);
    }  
  } 
}

function asHtml(players) {
  const elements = [];
  players.results.forEach(u => elements.push(entry(u)));
  return elements.join('');
}

function entry(u) {
  return `<li><button onclick='addPlayerData(${u.eid});'>${u.name}</button></li>`;
}

module.exports.appendTo = appendTo;
module.exports.playerData = playerData;
module.exports.ifIdExist = ifIdExist;
