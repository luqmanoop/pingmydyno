<div align="center">
	<img src="img/sleeping-dyno.gif">
	<h1 style="font-weight:bold;">pingmydyno</h1>
	<p>
		<b>Keep Heroku dynos awake forever ☕️</b>
	</p>
    <p>
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg">
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
    <a href="#contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/codeshifu/pingmydyno.svg"></a>
    </p>
</div>

## Why?

Heroku (free) dynos are great for hosting apps and showing them off to
your boss/friends or potential employer. The downside, however, is that your app
will fall asleep 😴 if it doesn't receive any web traffic within a 30-minute
window.

`pingmydyno` solves this by pinging your server periodically so it never falls asleep.

## Features

- Forever dyno pings
- Automatically retry ping on failure

## Installation

```bash
npm install pingmydyno

# or using yarn

yarn add pingmydyno
```

## Usage

With Express.js (ES6 module)

```javascript
...
import express from 'express';
import pingmydyno from 'pingmydyno';

const app = express();

...

app.listen(PORT, () => {
    pingmydyno('https://myapp.herokuapp.com');
});

```

With Hapi.js (commonJS)

```javascript
const Hapi = require('hapi');
const pingmydyno = require('pingmydyno');

const server = Hapi.server({ port, host });

async () => {
  await server.start();
  pingmydyno('https://myapp.herokuapp.com');
};
```

With Koa.js

```javascript
const Koa = require('koa');
const pingmydyno = require('pingmydyno');

const app = new Koa();
const url = process.env.APP_URL;

...

app.listen(3000).on('listening', () => {
    pingmydyno(url, {
        pingInterval: 60 * 15 * 1000, // ping every 15mins
        onFailure() {
            // logger
        }
    })
})
```

## APIs

**pingmydyno(url, [Config])**

### url

Type: `string`

Required: `yes`

### Config

Type: `Object`

Required: `no`

|              | value                 | default     | description                                          |
| ------------ | --------------------- | ----------- | ---------------------------------------------------- |
| pingInterval | number (milliseconds) | 1200000     | interval between the next ping (max = 25mins)        |
| maxRetry     | number                | 2           | retry times when ping fail                           |
| onSuccess    | function              | ( ) => null | callback function called when a ping is successful   |
| onFailure    | function              | ( ) => null | callback function called when `maxRetry` ping failed |

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://akhilo.me"><img src="https://avatars2.githubusercontent.com/u/15332525?v=4" width="100px;" alt="Kizito Akhilome"/><br /><sub><b>Kizito Akhilome</b></sub></a><br /><a href="https://github.com/codeshifu/pingmydyno/commits?author=akhilome" title="Code">💻</a></td><td align="center"><a href="https://twitter.com/codeshifu"><img src="https://avatars0.githubusercontent.com/u/5154605?v=4" width="100px;" alt="Luqman Olushi O."/><br /><sub><b>Luqman Olushi O.</b></sub></a><br /><a href="https://github.com/codeshifu/pingmydyno/issues?q=author%3Acodeshifu" title="Bug reports">🐛</a> <a href="https://github.com/codeshifu/pingmydyno/commits?author=codeshifu" title="Code">💻</a> <a href="https://github.com/codeshifu/pingmydyno/commits?author=codeshifu" title="Documentation">📖</a> <a href="#maintenance-codeshifu" title="Maintenance">🚧</a></td></tr></table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!

## License

This project is license under
[MIT](https://github.com/codeshifu/pingmydyno/blob/master/LICENSE)
