<h1 align="center">Faucy</h1>
<p align="center">⛏ Get ethers from any testnet easily!</p>

<img src="https://i.ibb.co/GRHKGqv/Captura-de-Pantalla-2020-04-17-a-la-s-01-35-49.png">

---

<div align="center">
  <img src="https://img.shields.io/github/issues/cine-estrenos/estrenos-web?style=for-the-badge">
  <img src="https://img.shields.io/github/issues-pr/cine-estrenos/estrenos-web?style=for-the-badge">
</div>

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

  - [GatsbyJS](https://www.gatsbyjs.org)
  - [Chakra UI](https://chakra-ui.com)
  - [OZ Network.js](https://docs.openzeppelin.com/network-js/0.2/api)

* Backend
  - [Express](https://expressjs.com)
  - [Puppeteer](https://pptr.dev)
  - [Puppeteer Extra](https://github.com/berstend/puppeteer-extra)

- Shared
  - [Wretch](https://github.com/elbywan/wretch)
  - [Ethereum Address](https://www.npmjs.com/package/ethereum-address)

* Services
  - [Fleek](https://fleek.co)
  - [Heroku](https://www.heroku.com)
  - [2Captcha](https://2captcha.com)
  - [Browserless](https://www.browserless.io)

## Links

- [Ethereum Development with Go - Faucets](https://goethereumbook.org/faucets/)

- [HedgeTrade - What is an Ethereum Faucet?](https://hedgetrade.com/what-is-ethereum-faucet/)

- [Bitfalls - What Is an Ethereum Testnet and How Is It Used?](https://bitfalls.com/2018/05/31/what-is-an-ethereum-testnet-and-how-is-it-used/)

## Contributors

TBD

## Todo:

- [ ] (Frontend) Lighthouse Audits
- [ ] (Frontend) Deploy to [Fleek](https://fleek.co)
- [ ] (Frontend) Split logic into custom hooks / constate
- [ ] (Frontend) Add E2E tests for each network
- [ ] (Frontend) Support for No Provider / Fix useEffect warnings
- [ ] (Frontend) Add lottie with [coins](https://icons8.com/animated-icons/coins) animations to Send Eth
- [ ] (Frontend/Backend) Add email input to send notification through email
- [ ] (Frontend/Backend) Add TypeScript support
- [ ] (Frontend/Backend) Add Husky Hooks + XO rules
- [ ] (Frontend/Backend) Add Sentry error logger
- [ ] (Frontend/Backend) Add Docker to run entire project
- [ ] (Frontend/Backend) Add status page for each network service
- [ ] (Frontend/Backend) Save each request using GunDB. And display a table with: Address | Network | Quantity | Status
- [ ] (Backend) Add support for Rinkeby
- [ ] (Backend) Deploy to [Heroku](https://www.heroku.com)
- [ ] (Backend) New proxy for Ropsten service on each request
- [ ] (Backend) Improve CORS setup for prod and dev url
- [ ] (Design) Review entire UI/UX with Emilia
- [ ] (Marketing) Eth weekly / DappHero docs / Twitter
- [ ] (Marketing) Add "Who is using it?" in GitHub
- [ ] (Marketing) Release/Feedback to/from friend companies

## Done:

- [x] (Frontend) Display etherscan link
- [x] (Backend) Wrap response data into body object
- [x] (Backend) Add development script
- [x] (Backend) Trigger POST to Goerli url
- [x] (Backend) Add support for Ropsten
- [x] (Backend) Add support for Kovan
- [x] (Backend) Add support for Goerli
- [x] (Frontend/Backend) Add script to run both projects in development mode
- [x] (Docs) Add frontend/backend/services stack
