# Furret bot for discord
![botIcon](botIcon.png)

## List of content
* [About](https://github.com/Zamur650/Furret#About)
* [Functions](https://github.com/Zamur650/Furret#functions)
* [Config.json guide](https://github.com/Zamur650/Furret#configjson-guide)
  * [token](https://github.com/Zamur650/Furret#token)
  * [prefix](https://github.com/Zamur650/Furret#prefix)
  * [news](https://github.com/Zamur650/Furret#news)
  * [welcomeChannel](https://github.com/Zamur650/Furret#welcomechannel)
  * [backgroundWelcomeImageName](https://github.com/Zamur650/Furret#backgroundwelcomeimagename)
* [Dependencies](https://github.com/Zamur650/Furret#dependencies)
* [Install](https://github.com/Zamur650/Furret#install)
### About
This bot made on [Discord.js](https://github.com/discordjs/discord.js) by Zamur650
### Functions
prefix + help - Displays this message  prefix + hi - Say hello  prefix + server - Server information  prefix + me - Get information about yourself  prefix + news - News  prefix + password - Generate passwords  prefix + music (link) - play music from YouTube (in development)  prefix + color (color) - display the color in hex (#ffffff) or rgb (rgb (0,0,0)) no spaces or random (random color in hex (#ffffff) format)
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
avconv: ^3.1.0,
canvas: ^2.6.1,
discord.js: ^12.2.0,
ffmpeg: 0.0.4,
opusscript: 0.0.7,
ytdl-core: ^3.2.1
## Install
You need install [node](https://nodejs.org/en/)

In console you need to write in cmd/bash
```npm install avconv canvas discord.js ffmpeg oppusscript ytdl-core```

After this you need to install [FFmpeg](https://ffmpeg.org/download.html)

To start it you need to write node index.js

Enjoy :D
