const https = require('https');

let args = [15]

https.get('https://play.pokemonshowdown.com/data/pokedex.js?4076b733/', (json) => {
  let body = '';

  json.on('data', (chunk) => {
    body += chunk;
  });

  json.on('end', () => {
    eval(body);
    
    
  });
});