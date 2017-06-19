# Tedis

Tedis is a beautiful, easy-to-use Tile38 management application built on the modern web with [Electron](https://github.com/atom/electron), [React](https://facebook.github.io/react/), and [Redux](https://github.com/rackt/redux). It's powered by many awesome Node.js modules, especially [ioredis](https://github.com/luin/ioredis) and [ssh2](https://github.com/mscdex/ssh2).

Tedis starts with all the basic features you need:

* Keys viewing/editing
* SSH Tunnel for connecting with remote servers
* Terminal for executing custom commands
* Config viewing/editing

It also supports many advanced features:

* JSON/MessagePack format viewing/editing and built-in highlighting/validator
* Working with millions keys and key members without blocking the redis server
* Pattern manager for easy selecting a sub group of keys.

**Note**: Tedis only supports Redis >= 2.8 version because `SCAN` command was introduced since 2.8. `SCAN` is very useful to get key list without blocking the server, which is crucial to the production environment. Because the latest stable is 3.0 and 2.6 is a very old version, Tedis doesn't support it.

## Download Tedis

You can download compiled versions of Tedis for Mac OS X from [the release page](https://github.com/luin/tedis/releases). Support for Windows and Linux is coming soon.

## Running Locally

1. Install dependencies

    $ npm install

2. Compile assets:

    $ npm run build

3. Run with Electron:

    $ npm run electron

## Connect to Heroku
Tedis can connect to Heroku Redis addon to manage your data. You just need to call `heroku redis:credentials --app APP` to get your redis credential:

```shell
$ heroku redis:credentials --app YOUR_APP
redis://x:PASSWORD@HOST:PORT
```

And then input `HOST`, `PORT` and `PASSWORD` to the connection tab.

## I Love This. How do I Help?

* Simply star this repository :-)
* Help us spread the world on Facebook and Twitter
* Contribute Code! We're developers! (See Roadmap below)
* Tedis is available on the Mac App Store as a paid software. I'll be very grateful if you'd like to buy it to encourage me to continue maintaining Tedis. There are no additional features comparing with the open-sourced version, except the fact that you can enjoy auto updating that brought by the Mac App Store. <br> [![Download on the App Store](http://gettedis.com/download.svg)](https://itunes.apple.com/app/tedis-gui-for-redis/id1063631769)

## Roadmap

* Windows and Linux version (with electron-packager)
* Support for SaaS Redis services
* Lua script editor
* Cluster management
* GEO keys supporting

## Contributors
<table><tr><td width="20%"><a href="https://github.com/luin"><img src="https://avatars1.githubusercontent.com/u/635902?v=3" /></a><p align="center">luin</p></td><td width="20%"><a href="https://github.com/kvnsmth"><img src="https://avatars0.githubusercontent.com/u/127?v=3" /></a><p align="center">kvnsmth</p></td><td width="20%"><a href="https://github.com/dpde"><img src="https://avatars2.githubusercontent.com/u/485645?v=3" /></a><p align="center">dpde</p></td><td width="20%"><a href="https://github.com/ogasawaraShinnosuke"><img src="https://avatars1.githubusercontent.com/u/5368888?v=3" /></a><p align="center">ogasawaraShinnosuke</p></td><td width="20%"><a href="https://github.com/naholyr"><img src="https://avatars1.githubusercontent.com/u/214067?v=3" /></a><p align="center">naholyr</p></td></tr><tr><td width="20%"><a href="https://github.com/hlobil"><img src="https://avatars2.githubusercontent.com/u/484499?v=3" /></a><p align="center">hlobil</p></td><td width="20%"><a href="https://github.com/Janpot"><img src="https://avatars1.githubusercontent.com/u/2109932?v=3" /></a><p align="center">Janpot</p></td></table>

## License

MIT
