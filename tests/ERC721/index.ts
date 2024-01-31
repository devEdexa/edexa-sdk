import { expect } from 'chai';
import { DEFAULT_NETWORK } from '../../src/util/constant';
import { ERC721 } from '../../src';
import path from 'path';
import dotenv from 'dotenv';
import {
  IAccount,
  IApproveBody,
  IMintBody,
  IOwnerBody,
  IOwnerDetailsBody,
  ISetOperatorAllBody,
  ISetOperatorBody,
  ITokenTransferBody,
  ITokenTransferFromBody,
} from '../../src/util/interface/IERC721';
const envFound = dotenv.config();

const settings = { network: DEFAULT_NETWORK };
let token;
let tokenId;
const userName = 'test0@edexa';
// const invalidAuthToken = process.env.INVALID_AUTH_TOKEN;
// const invalidFileId = '00000657f9275197e4c00000';

describe('Authenticate user', function () {
  it('It should returns information about user', function (done) {
    const authSettings = {
      headers: {
        'client-id': process.env.ERC_CLIENT_ID,
        'secret-key': process.env.ERC_SECRET_KEY,
      },
    };
    const erc721 = new ERC721(settings);
    erc721
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
      headers: {
        'client-id': process.env.INVALID_CLIENT_ID,
        'secret-key': process.env.INVALID_SECRET_KEY,
      },
    };
    const erc721 = new ERC721(settings);
    erc721
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
      headers: {
        'client-id': '',
        'secret-key': '',
      },
    };
    const erc721 = new ERC721(settings);
    erc721
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
      headers: {
        'client-id': process.env.BARCHIVE_CLIENT_ID,
        // 'secret-key': '',
      },
    };
    const erc721 = new ERC721(settings);
    erc721
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
      headers: {
        // 'client-id': '',
        'secret-key': process.env.BARCHIVE_SECRET_KEY,
      },
    };
    const erc721 = new ERC721(settings);
    erc721
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

  it('It should return account get successfully', done => {
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getAccount({})
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
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
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
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
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
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
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
  it('It should return File added successfully', done => {
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
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
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
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
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
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
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
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

describe('Mint Token', function () {
  const data: IMintBody = {
    value: '1000.000',
    tokenUrl: 'http://localhost/721',
  };

  //success response
  it('It should return File added successfully', done => {
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .mintToken(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('tokenId', 'tokenURI', 'minter');
        expect(data.tokenId).to.be.an('string');
        expect(data.tokenURI).to.be.an('string');
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
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
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
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
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
  it('It should return "value is not allowed to be empty"', done => {
    const wrongData = { value: '', tokenUrl: 'http://localhost/721' };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
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
  // it('It should return "value should be a type of string"', done => {
  //   const wrongData = { value: 10, tokenUrl: 'http://localhost/721' };
  //   const erc721Data = new ERC721({
  //     ...settings,
  //     authorization: `Bearer ${token}`,
  //   });
  //   erc721Data
  //     .mintToken(wrongData)
  //     .then(data => {
  //       ;
  //       done();
  //     })
  //     .catch(error => {
  //       ;
  //       expect(error).to.be.an('object');
  //       expect(error.status).to.be.an('number');
  //       expect(error.message).to.be.an('string');
  //       done();
  //     });
  // });
});

describe('Get the total Supply or total minted token', function () {
  //success response
  it('It should return File added successfully', done => {
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getTotalSupply()
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('supply');
        expect(data.supply).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
      .getTotalSupply()
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
  it('It should return "Invalid token"', done => {
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
      .getTotalSupply()
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
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
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
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
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
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
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
  it('It should return "tokenId is not allowed to be empty"', done => {
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getTokenURI({ tokenId: '' })
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
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .tokenTransfer(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('from', 'to', 'tokenId');
        expect(data.from).to.be.an('string');
        expect(data.to).to.be.an('string');
        expect(data.tokenId).to.be.an('string');
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
    };
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
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
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
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
      tokenId: '',
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
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
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
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

describe('Token Transfer From one user to another user', function () {
  //success response
  it('It should return "Token transfer successfully"', done => {
    const data: ITokenTransferFromBody = {
      to: 'test00@edexa',
      from: userName,
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .tokenTransferFrom(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('spender', 'to');
        expect(data.spender).to.be.an('string');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: ITokenTransferFromBody = {
      to: 'test00@edexa',
      from: userName,
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
      .tokenTransferFrom(data)
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
    const data: ITokenTransferFromBody = {
      to: 'test00@edexa',
      from: userName,
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
      .tokenTransferFrom(data)
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
  it('It should return "tokenId is not allowed to be empty"', done => {
    const data: ITokenTransferFromBody = {
      to: 'test00@edexa',
      from: userName,
      tokenId: '',
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .tokenTransferFrom(data)
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
  it('It should return "User not found"', done => {
    const data: ITokenTransferFromBody = {
      to: 'wrong user',
      from: userName,
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .tokenTransferFrom(data)
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

describe('Set Operator', function () {
  before(done => {
    const mintData = {
      value: '1000.000',
      tokenUrl: 'http://localhost/721',
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .mintToken(mintData)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('tokenId', 'tokenURI', 'minter');
        tokenId = data.tokenId;
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
  //success response
  it('It should return "Operator set successfully"', done => {
    const data: ISetOperatorBody = {
      operator: userName,
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .setOperator(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('operator', 'owner', 'tokenId');
        expect(data.operator).to.be.an('string');
        expect(data.owner).to.be.an('string');
        expect(data.tokenId).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: ISetOperatorBody = {
      operator: userName,
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
      .setOperator(data)
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
    const data: ISetOperatorBody = {
      operator: userName,
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
      .setOperator(data)
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
    const data: ISetOperatorBody = {
      operator: userName,
      tokenId: '',
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .setOperator(data)
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
  it('It should return "User not found"', done => {
    const data: ISetOperatorBody = {
      operator: 'wrong user',
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .setOperator(data)
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

describe.skip('Get Owner', function () {
  //success response
  it('It should return "Operator get successfully"', done => {
    const data: IOwnerBody = {
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getOwner(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('operator');
        expect(data.operator).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IOwnerBody = {
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
      .getOwner(data)
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
    const data: IOwnerBody = {
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
      .getOwner(data)
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
    const data: IOwnerBody = {
      tokenId: '',
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getOwner(data)
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

describe.skip('Get Approve status', function () {
  //success response
  it('It should return "Operator get successfully"', done => {
    const data: IApproveBody = {
      operator: userName,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getApproveStatus(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('approve');
        expect(data.approve).to.be.an('boolean');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IApproveBody = {
      operator: userName,
    };
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
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
  it('It should return "Invalid token"', done => {
    const data: IApproveBody = {
      operator: userName,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
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
    const data: IApproveBody = {
      operator: 'wrong user',
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
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
});

describe.skip('Getting list of Token with Owner name', function () {
  //success response
  it('Get admin owned token list "Total Token Owned get successfully"', done => {
    const data: IOwnerDetailsBody = {
      // userId: "test0@edexa", // if not pass any userId then return admin owned token list
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getOwnerDetails(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('array');
        expect(data[0].tokenUri).to.be.an('string');
        expect(data[0].owner).to.be.an('string');
        expect(data[0].tokenId).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
  //success response
  it('user owned token list "Total Token Owned get successfully"', done => {
    const data: IOwnerDetailsBody = {
      userId: userName, // finding for any spacific user token
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getOwnerDetails(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('array');
        expect(data[0].tokenUri).to.be.an('string');
        expect(data[0].owner).to.be.an('string');
        expect(data[0].tokenId).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IOwnerDetailsBody = {
      userId: userName, // finding for any spacific user token
    };
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
      .getOwnerDetails(data)
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
  it('It should return "Invalid token"', done => {
    const data: IOwnerDetailsBody = {
      userId: userName, // finding for any spacific user token
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
      .getOwnerDetails(data)
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
    const data: IOwnerDetailsBody = {
      userId: 'wrong user', // finding for any spacific user token
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getOwnerDetails(data)
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

describe('Set Operator for all', function () {
  //success response
  it('It should return "Operator get successfully"', done => {
    const data: ISetOperatorAllBody = {
      operator: userName,
      approve: true,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .setOperatorForAll(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('operator', 'owner', 'approve');
        expect(data.operator).to.be.an('string');
        expect(data.owner).to.be.an('string');
        expect(data.approve).to.be.an('boolean');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: ISetOperatorAllBody = {
      operator: userName,
      approve: true,
    };
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
      .setOperatorForAll(data)
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
    const data: ISetOperatorAllBody = {
      operator: userName,
      approve: true,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
      .setOperatorForAll(data)
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
    const data: ISetOperatorAllBody = {
      operator: 'wrong user',
      approve: true,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .setOperatorForAll(data)
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

describe('Burn Token', function () {
  before(done => {
    const mintData = {
      value: '1000.000',
      tokenUrl: 'http://localhost/721',
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .mintToken(mintData)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('tokenId', 'tokenURI', 'minter');
        tokenId = data.tokenId;
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
  //success response
  it('It should return File added successfully', done => {
    const data: any = {
      tokenId,
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
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
    };
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
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
    };
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
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
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
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
