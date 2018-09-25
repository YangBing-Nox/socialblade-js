# Social Blade API in JavaScript [<img align="right" src="https://cdn.tcole.me/socialblade-small.png">](https://github.com/TimothyCole/socialblade-js)

[![Build Status](https://travis-ci.com/TimothyCole/socialblade-js.svg?branch=master)](https://travis-ci.com/TimothyCole/socialblade-js)
[![Personal Discord](https://img.shields.io/discord/313591755180081153.svg?label=Personal%20Discord&colorB=308bcd&maxAge=3600)](https://discordapp.com/invite/YFtfGwq)
[![Social Blade Discord](https://img.shields.io/discord/125022847562285056.svg?label=Social%20Blade%20Discord%20(Not%20for%20Support)&colorB=c84329&maxAge=3600)](https://socialblade.com/discord)

---

### Information and Disclaimer
Just because I work for Social Blade does not mean this is an official library. Though it is used in Social Blade official products.

This library supports most of the `api.socialblade.com` endpoints that are being exposed by either the official Social Blade Browser Extensions, Apps, or Website.

Social Blade's API is a private API used for Social Blade official tools and for companies with express written permission. Use of the Social Blade API without express permission is prohibited by the active [Terms of Service](https://socialblade.com/info/terms) and may result in being blocked from the Social Blade website and all of it's data.

---

## Install
```bash
npm install --save socialblade
```

## Usage
Import the library into your project and construct a new client which will be used to access the API.  
Use either the third-party `Auth` function or first-party `AuthAsUser` function to set the client as "active".

#### TypeScript
```ts
import { SocialBladeClient } from 'socialblade';

const socialblade: SocialBladeClient = new SocialBladeClient();
// Third-Party Auth
socialblade.Auth("Third-Party API Key").then((data: IDeveloper) => {
	console.log(data)
});

// First-Party Auth
socialblade.AuthAsUser("User Email", "User Access Token").then((data: IUser) => {
	console.log(data)
});
```

#### ES6+
```js
const SocialBladeClient = require("socialblade").SocialBladeClient;

const socialblade = new SocialBladeClient();
// Third-Party Auth
socialblade.Auth("Third-Party API Key").then(console.log)

// First-Party Auth
socialblade.AuthAsUser("User Email", "User Access Token").then(console.log)
```

## Examples
#### Get YouTube Channel Stats &mdash; [ [Third-Party Auth](examples/youtube-stats-Auth.js), [First-Party Auth](examples/youtube-stats-AuthAsUser.js) ]
_More examples coming soon. Library still early development_

## Troubleshooting
If you have official access to the Social Blade API via express permission from the company then feel free to contact me via [Twitter](https://twitter.com/messages/compose?recipient_id=1690693537) or [email me](mailto:tim@timcole.me?cc=tim@socialblade.com&subject=Social%20Blade%20JavaScript%20Library%20Inquiry) for any help.
