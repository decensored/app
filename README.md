# Decensored

## Disclaimer

This is a proof of concept. Moderation is limited. Do not post offensive stuff or break the law! Developers are not resposible for whatever you do with this project!

## About

Decensored is a decentralized social media protocol. It is currently
a working proof-of-concept.
The Decensored smart contracts can be found at https://github.com/mikrohash/decensored-contracts

## Installation

```
git clone https://github.com/mikrohash/decensored
cd decensored/app
npm install
```
- To run the frontend locally on http://127.0.0.1:8080

```
npm start
```

## Development

<a href='https://tailwindcss.com/docs/installation' target='_blank'>Tailwind</a> requirements:

- To run the frontend locally on http://127.0.0.1:8080 and to rebuild the css on change. You’ll need to ensure you are running Node.js 12.13.0 or higher.

```
npm run develop
```

- To just build your CSS.

```
npm run tailwind:build
```

## Plugins

Plugins should register themselves and provide functions that will be called by the Decensored core.
Supported functions and their intended no-operation are as follows: (see also: plugins/example/init.js)

- init() { }
- display_transform(message) { return message; } [return empty string to hide this post]
- post_transform(message) { return message; }    [return empty string to cancel posting]
