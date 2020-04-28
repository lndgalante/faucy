<h1 align="center">Faucy</h1>
<p align="center">⛏ Get ethers from any testnet easily!</p>

<img src="https://i.ibb.co/CWNG9cY/faucy.png">

---

<div align="center">
  <img src="https://img.shields.io/github/issues/lndgalante/faucy?style=for-the-badge">
  <img src="https://img.shields.io/github/issues-pr/lndgalante/faucy?style=for-the-badge">
</div>

## Features

- 🔋 PWA Support
- 🦮 Accessibility First
- 🌚 Dark Mode Support
- ⚡ 100/100 LightHouse Audits
- ⏰ Displays transaction status (using [Notify.js](https://docs.blocknative.com/notify))
- 📦 Distributed over fast and secure IPFS (using [Fleek](https://fleek.co))
- ☁️ Fast and reliable microservices solution (using [AWS](https://aws.amazon.com))
- 🔗 Address and Network inputs in-sync with your Web3 Provider (using [Ethers.js](https://github.com/ethers-io/ethers.js))

## Development

1. Install all dependencies

```bash
> yarn install:all:deps
```

2. Run ngrok command

```bash
ngrok http 3000
```

3. Copy HTTPS url from ngrok to Gatsby environment variable

```bash
GATSBY_FAUCY_API_URL=https://a5ee9cd4.ngrok.io
```

4. Run both projects in parallel

```bash
> yarn dev:all
```

## Stack

- Frontend
  - [Gatsby](https://www.gatsbyjs.org)
  - [Chakra](https://chakra-ui.com)
  - [Ethers.js](https://github.com/ethers-io/ethers.js)

* Backend
  - [Express](https://expressjs.com)
  - [Puppeteer](https://pptr.dev)
  - [Puppeteer Extra](https://github.com/berstend/puppeteer-extra)

## Links

- [Ethereum Development with Go - Faucets](https://goethereumbook.org/faucets/)
- [HedgeTrade - What is an Ethereum Faucet?](https://hedgetrade.com/what-is-ethereum-faucet/)
- [Bitfalls - What Is an Ethereum Testnet and How Is It Used?](https://bitfalls.com/2018/05/31/what-is-an-ethereum-testnet-and-how-is-it-used/)

## Roadmap:

- May 2020 👉 Internal release
- June 2020 👉 Official release

## Todo:

- [ ] (Backend) Add Proxy to Browserless
- [ ] (Backend) Move over to Rinkeby/Goerli auth faucet
- [ ] (Frontend) Add E2E tests for each network
- [ ] (Frontend) Connect feedback component to StaticKit
- [ ] (Frontend) Add timeout (serviceDuration + 30s) to POST call
- [ ] (Frontend) Display output data on a div and not through toasts
- [ ] (Frontend) Get ideas from [Aragon UI](https://ui.aragon.org/) components
- [ ] (Frontend/Backend) Add TypeScript support
- [ ] (Frontend/Backend) Add Sentry error logger
- [ ] (Frontend/Backend) Add Docker to run entire project
- [ ] (Frontend/Backend) Add status page for each network service
- [ ] (Frontend/Backend) GunDB: Save each request on frontend, and send id in the body
- [ ] (Frontend/Backend) GunDB: Display the latest ongoing [request](https://i.ibb.co/c1v6SzK/Captura-de-Pantalla-2020-04-21-a-la-s-17-56-42.png)
- [ ] (Frontend/Backend) GunDB: Update request on the server when the operation it's finished
- [ ] (Frontend/Backend) GunDB: Allow only one operation per network at a time
- [ ] (Frontend/Backend) GunDB: Save successful operations to display [stats](https://i.ibb.co/HGZtYrH/Captura-de-Pantalla-2020-04-21-a-la-s-17-54-03.png) afterwards
- [ ] (Design) Review entire UI/UX with Emilia
- [ ] (Marketing) Eth weekly / DappHero docs / Twitter
- [ ] (Marketing) Think about bussiness model
- [ ] (Marketing) Add "Who is using it?" in GitHub
- [ ] (Marketing) Release/Feedback to/from friend companies
- [ ] (Docs) Add supported browsers table section
- [ ] (Docs) Add how to contribute section

## Feedback:

- Adaptation with Truffle suite
- Generate API_KEY to use API directly
- Display other Tokens that are in that testnet

## Contributors

TBD

### License

MIT © **[`Xivis`](https://xivis.com)**
