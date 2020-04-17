# Faucy

Faas - Faucet as a service - Get eth easily!

# Development

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

# Todo:

- [ ] (Frontend) Lighthouse Audits
- [ ] (Frontend) Deploy to [Fleek](https://fleek.co)
- [ ] (Frontend) Split logic into custom hooks / constate
- [ ] (Frontend) Add E2E tests for each network
- [ ] (Frontend) Support for No Provider / Fix useEffect warnings
- [ ] (Frontend) Add lottie with [coins](https://icons8.com/animated-icons/coins) animations to Send Eth
- [ ] (Frontend/Backend) Send txHash as metadata and listen to it
- [ ] (Frontend/Backend) Add TypeScript support
- [ ] (Frontend/Backend) Add Husky Hooks + XO rules
- [ ] (Frontend/Backend) Add Sentry error logger
- [ ] (Backend) Add support for Rinkeby
- [ ] (Backend) Deploy to [Heroku](https://www.heroku.com)
- [ ] (Backend) New proxy for Ropsten service on each request
- [ ] (Backend) Improve CORS setup for prod and dev url
- [ ] (Design) Review entire UI/UX with Emilia
- [ ] (Marketing) Eth weekly / DappHero docs / Twitter
- [ ] (Marketing) Add "Who is using it?" in GitHub
- [ ] (Docs) Add costs for services like Browserless, 2Captcha
- [ ] (Frontend/Backend) Add Docker to run entire project

# Done:

- [x] (Frontend) Display etherscan link
- [x] (Backend) Wrap response data into body object
- [x] (Backend) Add development script
- [x] (Backend) Trigger POST to Goerli url
- [x] (Backend) Add support for Ropsten
- [x] (Backend) Add support for Kovan
- [x] (Backend) Add support for Goerli
- [x] (Frontend/Backend) Add script to run both projects in development mode

# Links

- [Ethereum Development with Go - Faucets](https://goethereumbook.org/faucets/)
