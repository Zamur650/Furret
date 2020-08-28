# Furret bot for discord
![botIcon](botIcon.png)

## List of content
* [About](https://github.com/Zamur650/Furret#about)
* [Files](https://github.com/Zamur650/Furret#files)
* [Functions](https://github.com/Zamur650/Furret#functions)
* [Config.json guide](https://github.com/Zamur650/Furret#configjson-guide)
  * [token](https://github.com/Zamur650/Furret#token)
  * [prefix](https://github.com/Zamur650/Furret#prefix)
  * [news](https://github.com/Zamur650/Furret#news)
  * [welcomeChannel](https://github.com/Zamur650/Furret#welcomechannel)
  * [backgroundWelcomeImageName](https://github.com/Zamur650/Furret#backgroundwelcomeimagename)
* [Dependencies](https://github.com/Zamur650/Furret#dependencies)
* [Install](https://github.com/Zamur650/Furret#install)
## Files
1. [index.js](index.js) - main file
2. [config.json](config.json) - config file
3. [readme.md](readme.md) - this file
4. [start.bat](start.bat)/[start.bash](start.bash) - start bat/bash files
5. [package.json](package.json)/[package-lock.json](package-lock.json) - npm info files
6. [ffmpeg.exe](ffmpeg.exe)/[ffplay.exe](ffplay.exe)/[ffprobe.exe](ffprobe.exe) - ffmpeg for music (windows)
5. [botIcon.png](botIcon.png)/[wallpaper.png](wallpaper.png) - images for bot
## About
This bot made on [Discord.js](https://github.com/discordjs/discord.js) by Zamur650
## Functions
prefix + help - Displays this message

prefix + hi - Say hello

prefix + server - Server information

prefix + me - Get information about yourself

prefix + news - News

prefix + password - Generate passwords

prefix + music (link) - play music from YouTube (in development)

prefix + color (color) - display the color in hex (#ffffff) or rgb (rgb (0,0,0)) no spaces or random (random color in hex (#ffffff) format)

prefix + pokedex (name or id of pokemon) - display information about pokemon
## Config.json guide
### token
You can get token [here](https://discord.com/developers/applications)
### prefix
You can write any prefix
### news
You can write news here
### welcomeChannel
Here you can write channel name and when somebode join server bot send message about new user
### backgroundWelcomeImageName
Image using in welcomeChannel
```
{
  "token": "Your_token",
  "prefix": "!",
  "news": "text",
  "welcomeChannel": "welcome",
  "backgroundWelcomeImageName": "wallpaper.png"
}
```
## Dependencies
[avconv: ^3.1.0,](https://www.npmjs.com/package/avconv)
[canvas: ^2.6.1,](https://www.npmjs.com/package/canvas)
[discord.js: ^12.2.0,](https://www.npmjs.com/package/discord.js)
[ffmpeg: 0.0.4,](https://www.npmjs.com/package/ffmpeg)
[opusscript: 0.0.7,](https://www.npmjs.com/package/opusscript)
[pokedex: ^1.1.0,](https://www.npmjs.com/package/pokedex)
[ytdl-core: ^3.2.1](https://www.npmjs.com/package/ytdl-core)
## Install
You need install [node](https://nodejs.org/en/)

In console you need to write in cmd/bash
```npm install avconv canvas discord.js ffmpeg oppusscript ytdl-core```

After this you need to install [FFmpeg](https://ffmpeg.org/download.html)

To start it you need to write node index.js

Enjoy :D
