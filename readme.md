# pkmshowdownbot bot for discord
![botIcon](botIcon.png)

## List of content
* [About](https://github.com/Zamur650/pkmshowdownbot#about)
* [Functions](https://github.com/Zamur650/pkmshowdownbot#functions)
* [Config.json guide](https://github.com/Zamur650/pkmshowdownbot#configjson-guide)
  * [token](https://github.com/Zamur650/pkmshowdownbot#token)
  * [prefix](https://github.com/Zamur650/pkmshowdownbot#prefix)
  * [developerID](https://github.com/Zamur650/pkmshowdownbot#developerID)
  * [botColor](https://github.com/Zamur650/pkmshowdownbot#botColor)
* [Dependencies](#dependencies)
* [Install](#install)
## About
This bot made on [Discord.js](https://github.com/discordjs/discord.js) by Zamur650
## Functions
prefix + pokedex (name or id of pokemon) - display information about pokemon
## Config.json guide
### token
You can get token [here](https://discord.com/developers/applications)
### prefix
You can write any prefix
### developerID
You can put your [discord](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID) id here
### botColor
You can write color for commands
```json
{
  "token": "Your_token",
  "prefix": "$",
  "developerID": "586128640136445964",
  "botColor": "#ffcc99"
}
```
## Dependencies
[discord.js](https://www.npmjs.com/package/discord.js)
## Install
You need install [node](https://nodejs.org/en/)

In console you need to write in cmd/bash
```npm install discord.js```

To start it you need to write in console: `node index.js` or `pm2 start .`

Enjoy :D