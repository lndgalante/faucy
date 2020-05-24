<h1 align="center">Faucy</h1>

<p align="center">⛏ Get ethers from any testnet easily!</p>

<img src="https://i.ibb.co/931dDDT/faucy.png">

---

<div align="center">
  <img src="https://img.shields.io/github/issues/xivis/faucy?style=for-the-badge">
  <img src="https://img.shields.io/github/issues-pr/xivis/faucy?style=for-the-badge">
  <a href="https://t.me/faucy">
    <img src="https://img.shields.io/badge/Telegram-Faucy-blue?style=for-the-badge&logo=telegram&message=Telegram&color=blue" alt="Chat on Telegram">
  </a>
</div>

## Introduction

Are you tired of:

- looking how to get ethers on testnets?
- trying to understand how Faucets works?
- looking on Faucets that are properly working?
- looking on Faucets that doesn't block your IP by 24hs?

We've got you covered! Now with [Faucy](https://faucy.dev/) you can easily get ethers from any testnet.

## Features

- 🔋 PWA Support
- 🐙 100% Open Source
- ⏰ Displays transaction status (using [Notify.js](https://docs.blocknative.com/notify))
- 🔗 Address and Network in-sync with your Web3 Provider (using [Ethers.js](https://github.com/ethers-io/ethers.js))
- 🚰 No IP blockage, only by address for 24hs, switching addresses you can keep requesting eth

## Goodies

- 🦮 Accessibility First
- 🌚 Dark Mode Support
- ⚡️ 100/100 Lighthouse score
- 📦 Distributed over fast and secure IPFS (using [Fleek](https://fleek.co))
- ☁️ Reliability in mind, having a secondary service per faucet as redundancy

## Supported Networks

| Network | Status | Ethers |
| ------- | ------ | ------ |
| Ropsten | ✅     | 1      |
| Kovan   | ✅     | 0.1    |
| Rinkeby | ✅     | 0.2    |
| Goerli  | ✅     | 0.05   |

## Redundacy Networks

| Network | Status | Ethers |
| ------- | ------ | ------ |
| Ropsten | 🚧     | 0      |
| Kovan   | 🚧     | 0      |
| Rinkeby | 🚧     | 0      |
| Goerli  | 🚧     | 0      |

## Development

1. Install all dependencies

```bash
> npm install && npm run install:all:deps
```

2. Run ngrok command

```bash
> ngrok http 8080
```

3. Copy HTTPS url from ngrok to Gatsby environment variable

```bash
GATSBY_FAUCY_API_URL=https://a5ee9cd4.ngrok.io
```

4. Run both projects in parallel

```bash
> npm run dev:all
```

## Design

Take a look at our [Figma](https://www.figma.com/file/e2ki1kz4pSTsXX6KAuyuaI/Faucy_UI?node-id=0%3A1) implementation, comments and feedback are welcome.
We follow [Rimble Guides](https://rimble.consensys.design/guides) to create user-friendly blockchain experiences.

## Stack

| Frontend                                            | Backend                                                        | Services                                  |
| --------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------- |
| [Gatsby](https://www.gatsbyjs.org)                  | [Express](https://expressjs.com)                               | [Fleek](https://fleek.co)                 |
| [Chakra](https://chakra-ui.com)                     | [Puppeteer](https://pptr.dev)                                  | [2Captcha](https://2captcha.com)          |
| [Ethers.js](https://github.com/ethers-io/ethers.js) | [Puppeteer Extra](https://github.com/berstend/puppeteer-extra) | [Browserless](https://www.browserless.io) |

## Who's using it?

- [DappHero](https://www.dapphero.io)

## How to Contribute

Take a look at [Project Guidelines](https://github.com/elsewhencode/project-guidelines) in order to follow best practices.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://leonardogalante.com"><img src="https://avatars3.githubusercontent.com/u/2475912?v=4" width="100px;" alt=""/><br /><sub><b>Leonardo Galante</b></sub></a><br /><a href="https://github.com/Xivis/faucy/commits?author=lndgalante" title="Code">💻</a> <a href="https://github.com/Xivis/faucy/commits?author=lndgalante" title="Documentation">📖</a> <a href="#projectManagement-lndgalante" title="Project Management">📆</a></td>
    <td align="center"><a href="https://www.behance.net/emiliabagliani"><img src="https://media-exp1.licdn.com/dms/image/C4E03AQHGpJwQYpFQHQ/profile-displayphoto-shrink_400_400/0?e=1594857600&v=beta&t=ILsXvhGSqV-6U9E0kJQhy7MMmPtf9Yg2-GlbWPqsPMw" width="100px;" alt=""/><br /><sub><b>Emilia Bagliani</b></sub></a><br /><a href="#design-emiliabagliani" title="Design">🎨</a> <a href="#a11y-emiliabagliani" title="Accessibility">️️️️♿️</a></td>
    <td align="center"><a href="https://github.com/alavarello"><img src="https://avatars2.githubusercontent.com/u/19600590?v=4" width="100px;" alt=""/><br /><sub><b>Agustin Lavarello</b></sub></a><br /><a href="https://github.com/Xivis/faucy/commits?author=alavarello" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/frandelgado"><img src="https://avatars2.githubusercontent.com/u/28745941?v=4" width="100px;" alt=""/><br /><sub><b>Francisco Delgado</b></sub></a><br /><a href="https://github.com/Xivis/faucy/commits?author=frandelgado" title="Code">💻</a><a href="#projectManagement-frandelgado" title="Project Management">📆</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Information

- [Ethereum Development with Go - Faucets](https://goethereumbook.org/faucets/)
- [HedgeTrade - What is an Ethereum Faucet?](https://hedgetrade.com/what-is-ethereum-faucet/)
- [Bitfalls - What Is an Ethereum Testnet and How Is It Used?](https://bitfalls.com/2018/05/31/what-is-an-ethereum-testnet-and-how-is-it-used/)

### License

MIT © **[`Xivis`](https://xivis.com)**
