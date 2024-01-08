import { expect } from 'chai';
import { DEFAULT_NETWORK } from '../../src/util/constant';
import { ERC1155 } from '../../src';
import dotenv from 'dotenv';
import {
  IAccount,
  IApproveBody,
  IApproveStatusBody,
  IBatchBalance,
  IBatchBurnBody,
  IBatchMintBody,
  IBatchTokenTransferBody,
  IMintBody,
  IMultiUserTokenTransferBody,
  ISetURIBody,
  ITokenTransferBody,
} from '../../src/util/interface/IERC1155';
import { IBurnBody } from '../../src/util/interface/IERC1155';
const envFound = dotenv.config();

const settings = { network: DEFAULT_NETWORK };
let token;
let tokenId;
const userName = 'test0@edexa';
const admin = 'yog00@edexa';
// const invalidAuthToken = process.env.INVALID_AUTH_TOKEN;
// const invalidFileId = '00000657f9275197e4c00000';

describe('Authenticate user', function () {
  it('It should returns information about user', function (done) {
    const authSettings = {
      clientId: process.env.ERC_CLIENT_ID,
      secretKey: process.env.ERC_SECRET_KEY,
    };
    const erc1155 = new ERC1155(settings);
    erc1155
      .authenticate(authSettings)
      .then(data => {
        token = data.token;
        expect(data).to.be.an('object').with.all.keys('id', 'token', 'username', 'name');
        expect(data.id).to.be.an('string');
        expect(data.token).to.be.an('string');
        expect(data.username).to.be.an('string');
        expect(data.name).to.be.an('string');
        done();
      })
      .catch(() => {
        done();
      });
  });
  it('It should returns invalid user or user not found', function (done) {
    const authSettings = {
      clientId: process.env.INVALID_CLIENT_ID,
      secretKey: process.env.INVALID_SECRET_KEY,
    };
    const erc1155 = new ERC1155(settings);
    erc1155
      .authenticate(authSettings)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });

  it('It should return client id is not allowed to be empty', function (done) {
    const authSettings = {
      clientId: '',
      secretKey: '',
    };
    const erc1155 = new ERC1155(settings);
    erc1155
      .authenticate(authSettings)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });

  it('It should return "Secret key is required"', function (done) {
    const authSettings = {
      clientId: process.env.ERC_CLIENT_ID,
      // secretKey: process.env.ERC_SECRET_KEY,
    };
    const erc1155 = new ERC1155(settings);
    erc1155
      .authenticate(authSettings)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });

  it('It should return "Client id is required"', function (done) {
    const authSettings = {
      // clientId: process.env.ERC_CLIENT_ID,
      secretKey: process.env.ERC_SECRET_KEY,
    };
    const erc1155 = new ERC1155(settings);
    erc1155
      .authenticate(authSettings)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Account Data', function () {
  const data: IAccount = {
    userId: 'WnCrk4D4z8Xg3LQi',
  };

  it('It should return "account get successfully"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getAccount({}) // if not pass any userId then it return admin account name
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('username');
        expect(data.username).to.be.an('string');
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return "Authorization token not found or Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .getAccount(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .getAccount(data)
      .then(data => {
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "User not Found"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getAccount(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Get balance', function () {
  const data: IAccount = {
    // userId: 'WnCrk4D4z8Xg3LQi',
  };

  //success response
  it('It should return "Balance get successfully"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getBalance(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('balance');
        expect(data.balance).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .getBalance(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .getBalance(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "User not Found"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getBalance({ userId: 'test' })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Batch Balance getting multiple users balance', function () {
  const data: IBatchBalance = {
    userId: [admin, userName],
    tokenId: [parseInt(tokenId), parseInt(tokenId)],
  };

  //success response
  it('It should return "Balance get successfully"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getBatchBalance(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('balance');
        expect(data.balance).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .getBatchBalance(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .getBatchBalance(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "User not Found"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getBatchBalance({ userId: ['test'], tokenId: [parseInt(tokenId)] })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Mint Token', function () {
  const data: IMintBody = {
    value: '1000',
    tokenId: '1',
  };

  //success response
  it('It should return "Token minted successfully"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .mintToken(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('minter', 'tokenId');
        expect(data.tokenId).to.be.an('string');
        expect(data.minter).to.be.an('string');
        tokenId = data.tokenId;
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .mintToken(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .mintToken(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "value field is not allowed to be empty"', done => {
    const wrongData = { value: '', tokenId: '1' };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .mintToken(wrongData)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Batch Mint Token', function () {
  const data: IBatchMintBody = {
    value: [1000, 1000],
    tokenId: [1, 2],
  };

  //success response
  it('It should return "Token minted successfully"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .batchMint(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('minter', 'tokenId');
        expect(data.tokenId).to.be.an('string');
        expect(data.minter).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .batchMint(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .batchMint(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Set Token URI', function () {
  //success response
  it('It should return "Token URI get successfully"', done => {
    const data: ISetURIBody = {
      tokenId,
      URL: `http://localhost/${tokenId}`,
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .setTokenURI(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('URI');
        expect(data.URI).to.be.an('string');
        done();
      })
      .catch(error => {
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: ISetURIBody = {
      tokenId,
      URL: `http://localhost/${tokenId}`,
    };
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .setTokenURI(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const data: ISetURIBody = {
      tokenId,
      URL: `http://localhost/${tokenId}`,
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .setTokenURI(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Get the Token URI', function () {
  const data: IAccount = {
    // tokenId: 'WnCrk4D4z8Xg3LQi',
  };
  //success response
  it('It should return "Token URI get successfully"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getTokenURI({ tokenId })
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('URI');
        expect(data.URI).to.be.an('string');
        done();
      })
      .catch(error => {
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .getTokenURI({ tokenId })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .getTokenURI({ tokenId })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Token Transfer', function () {
  //success response
  it('It should return "Token transfer successfully"', done => {
    const data: ITokenTransferBody = {
      to: userName,
      tokenId,
      value: '18',
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .tokenTransfer(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('from', 'to', 'tokenId');
        expect(data.from).to.be.an('string');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: ITokenTransferBody = {
      to: userName,
      tokenId,
      value: '10',
    };
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .tokenTransfer(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const data: ITokenTransferBody = {
      to: userName,
      tokenId,
      value: '10',
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .tokenTransfer(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "tokenId is not allowed to be empty"', done => {
    const data: ITokenTransferBody = {
      to: userName,
      tokenId,
      value: '10',
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .tokenTransfer(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "User not found"', done => {
    const data: ITokenTransferBody = {
      to: 'wrong user',
      tokenId,
      value: '18',
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .tokenTransfer(data)
      .then(data => {
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Batch Token Transfer', function () {
  //success response
  it('It should return "Token transfer successfully"', done => {
    const data: IBatchTokenTransferBody = {
      to: userName,
      tokenId: [parseInt(tokenId)],
      value: [10],
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .batchTokenTransfer(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('from', 'to', 'tokenId');
        expect(data.from).to.be.an('string');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IBatchTokenTransferBody = {
      to: userName,
      tokenId: [parseInt(tokenId)],
      value: [10],
    };
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .batchTokenTransfer(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const data: IBatchTokenTransferBody = {
      to: userName,
      tokenId: [tokenId],
      value: [10],
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .batchTokenTransfer(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "User not found"', done => {
    const data: IBatchTokenTransferBody = {
      to: 'wrong user',
      tokenId: [parseInt(tokenId)],
      value: [10],
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .batchTokenTransfer(data)
      .then(data => {
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Batch Token Transfer from multiple users', function () {
  //success response
  it('It should return "Token transfer successfully"', done => {
    const data: IMultiUserTokenTransferBody = {
      to: [userName],
      tokenId: [parseInt(tokenId)],
      value: [10],
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .tokenTransferMultiUsers(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('from', 'to', 'tokenId');
        expect(data.from).to.be.an('string');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IMultiUserTokenTransferBody = {
      to: [userName],
      tokenId: [parseInt(tokenId)],
      value: [10],
    };
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .tokenTransferMultiUsers(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const data: IMultiUserTokenTransferBody = {
      to: [userName],
      tokenId: [parseInt(tokenId)],
      value: [10],
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .tokenTransferMultiUsers(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "User not found"', done => {
    const data: IMultiUserTokenTransferBody = {
      to: ['wrong user'],
      tokenId: [parseInt(tokenId)],
      value: [10],
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .tokenTransferMultiUsers(data)
      .then(data => {
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Approve permission to the user', function () {
  //success response
  it('It should return "Operator get successfully"', done => {
    const data: IApproveBody = {
      spender: userName,
      value: '100',
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .approveTokenAccess(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('allowanceAmount', 'to');
        expect(data.allowanceAmount).to.be.an('string');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IApproveBody = {
      spender: userName,
      value: '100',
    };
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .approveTokenAccess(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const data: IApproveBody = {
      spender: userName,
      value: '100',
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .approveTokenAccess(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "User not found"', done => {
    const data: IApproveBody = {
      spender: 'wrong user',
      value: '100',
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .approveTokenAccess(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Get Approve status', function () {
  //success response
  it('It should return "Spender request status"', done => {
    const data: IApproveStatusBody = {
      spender: userName,
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getApproveStatus(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('spender', 'status');
        expect(data.spender).to.be.an('string');
        expect(data.status).to.be.an('boolean');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IApproveStatusBody = {
      spender: userName,
    };
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .getApproveStatus(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error);
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const data: IApproveStatusBody = {
      spender: userName,
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .getApproveStatus(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "User not found"', done => {
    const data: IApproveStatusBody = {
      spender: 'wrong user',
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getApproveStatus(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error);
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Burn Token', function () {
  //success response
  it('It should return "Token burn successfully"', done => {
    const data: IBurnBody = {
      tokenId,
      value: '10',
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .burnToken(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('burner');
        expect(data.burner).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: any = {
      tokenId,
      value: '10',
    };
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .burnToken(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const data: any = {
      tokenId,
      value: '10',
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .burnToken(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "tokenId is not allowed to be empty"', done => {
    const data: any = {
      tokenId: '',
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .burnToken(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});

describe('Batch Burn Token', function () {
  //success response
  it('It should return "Token burn successfully"', done => {
    const data: IBatchBurnBody = {
      tokenId: [parseInt(tokenId), parseInt(tokenId)],
      value: [10, 10],
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .batchBurn(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('burner');
        expect(data.burner).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IBatchBurnBody = {
      tokenId: [tokenId, tokenId],
      value: [10, 10],
    };
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .batchBurn(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
  it('It should return "Invalid token"', done => {
    const data: IBatchBurnBody = {
      tokenId: [tokenId, tokenId],
      value: [10, 10],
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc1155Data
      .batchBurn(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });
});
