# 📝 Total Supply of minted tokens

## To inquire about the total supply of minted tokens with the ER20 API. This can be achieved by utilizing the totalSupply method.:

---

```SDK.js
import { ERC20, Network } from 'edeXa-sdk';

async function totalSupply() {
  const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });
  const settings = {
    network: Network.SANDBOX, // or Network.MAINNET for the mainnet network
  };

  const dataToGetTotalSupply = {
    chaincode(optional): 'The name of the smart contract or chaincode managing the tokens',
    channel(optional): 'The name of the channel in the blockchain network'
  }

  try {
    const totalSupplyResponse = await erc20.totalSupply(dataToGetTotalSupply);
  } catch (error) {
    // Handle the error
  }
}

```

---

- Please ensure to replace the `token` used in the `Authorization` header with your own unique `token`, which you will obtain in response to the [authentication method](./authenticate.md)

- In this example, the `balanceOf` function is an `async` function that utilizes `await` to pause execution until the `erc20.balanceOf` promise resolves. If the promise resolves successfully, the response for total supply will be logged. In case of an error, it will be caught and logged using `console.error`.

- Before attempting to fetch the total supply, make sure that the ERC-20 tokens have been minted. The minting process should be implemented using the specific minting function [Mint Tokens](./mint_token.md)

---

- Response Description: In response, the following attributes are included—`supply`.

  | Key             | Type   |
  | --------------- | ------ |
  | supply          | number |
