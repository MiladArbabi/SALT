const assert = require('assert');
const jsdom = require('jsdom');
const players = require('./players');

describe('Players Client', () => {

  const { JSDOM } = jsdom;

  const id = 3;
  
  const playersList = {
    count: 2,
    results: [
      {
        eid: 'id1',
        name: 'joe',
      },
      {
        eid: 'id2',
        name: 'jane',
      }
    ],
  };

  const playerEntity = {
    name: 'joe',
    gender: 'male',
    team: 'Barcelona',
  };

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="test" /></body></html>', {url: 'http://testhost:8080/bar.html'});
    global.document = dom.window.document;
    global.window = dom.window;
  });

  it('should list players', () => {
    const expected = '<li><button onclick="addPlayerData(id1);">joe</button></li><li><button onclick="addPlayerData(id2);">jane</button></li>';
    const element = document.querySelector('#test');

    players.appendTo(element, playersList);

    assert.equal(expected, element.innerHTML);
  });

  it('should add player data to article', () => {
    const expected = `<p>Name: ${playerEntity.name}</p><p>Gender: ${playerEntity.gender}</p><p>Team: ${playerEntity.team}</p>`;
    const element = document.querySelector('#test');
    players.playerData(element, id, playerEntity);

    assert.equal(expected, element.innerHTML);
  });

  it('should set location hash', () => {
    const element = document.querySelector('#test');
    players.playerData(element, id, playerEntity);

    assert.equal('#id=3', window.location.hash);
  });

  it('should run function if ID exist in location hash', (done) => {
    const hash = '#id=5';
    players.ifIdExist(hash, id => {
      assert.equal('5', id);
      done();
    });
  });
});
