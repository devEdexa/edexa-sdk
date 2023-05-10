# edeXa SDK

![GitHub version]
![Build Status]
![npm version]]

The edeXa SDK is the most comprehensive, stable, and powerful Javascript SDK available today to interact with the blockchain.

## Docs

[DOCUMENTATION LINK]

## Support

Our [Discord](https://discord.com/invite/TKBQS9tZJY) is the best way to reach us ✨.

## Contributors

You are very welcome to contribute, please see contributing guidelines - [[Contribute](CONTRIBUTING.md)].

Thank you to all the people who already contributed to edexa-sdk!


## Development

**Setup**

```bash
npm ci
```

**How to debug**

Write your code inside file `test/debug.js` and run below code

```bash
npm run debug
```

Above command will build the source code & install the builded version into test folder, which will be used by `debug.js`.

**Lint**

```bash
# To check lint errors
npm run lint

# To fix most common lint errors
# Note that it might not fix all errors, some need manual intervention
npm run lint:fix
```

**Build code**

```bash
npm run build
```

**Run test**

```bash
npm run test
```

**Generate distribution files**

```bash
npm run deploy
```

**NPM publish**

Before running publish script, make sure you have updated version properly.

Note that `prepublishOnly` script will be automatically called while publishing. It will check lint, clean dist/lib folders and build fresh distribution files before it executes `npm publish`.

```bash
npm publish
```

### License

MIT