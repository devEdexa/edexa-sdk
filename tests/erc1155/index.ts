import { expect } from 'chai';
import { DEFAULT_NETWORK } from '../../src/util/constant';
import { ERC1155 } from '../../src';
import dotenv from 'dotenv';
import {
  IAccount,
  IApproveBody,
  IApproveStatusBody,
  IBalance,
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
let token: string = '';
let tokenId;
let adminUserName: string = 'yog00@edexa';
let enrollUser: any = { username: 'test0@edexa' };
const chainCodeData = {
  chaincode: process.env.CHAIN_CODE_1155,
  channel: process.env.CHANNEL_1155,
};

describe('Authenticate user', function () {
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
  it('It should returns information about user', function (done) {
    const authSettings = {
      clientId: process.env.TOKEN_ENGINE_CLIENT_ID,
      secretKey: process.env.TOKEN_ENGINE_SECRET_KEY,
    };
    const erc1155 = new ERC1155(settings);
    erc1155
      .authenticate(authSettings)
      .then(data => {
        token = data.token;
        adminUserName = data.username;
        expect(data).to.be.an('object').with.all.keys('id', 'token', 'username', 'name');
        expect(data.id).to.be.an('string');
        expect(data.token).to.be.an('string');
        expect(data.username).to.be.an('string');
        expect(data.name).to.be.an('string');
        done();
      })
      .catch(error => {
        done();
      });
  });
});

// Register new user
describe('Enroll users', function () {
  it('It should return Authorization token not found', function (done) {
    const requestData: any = {
      firstName: 'token',
      lastName: 'user3',
      email: 'kk03@edexa.team',
    };
    const erc1155 = new ERC1155({
      ...settings,
    });
    erc1155
      .enrollUser(requestData)
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
  it('It should returns email is required', function (done) {
    const requestData: any = {
      firstName: 'token',
      lastName: 'user3',
    };
    const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc1155
      .enrollUser(requestData)
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
  it('It should returns invalid auth token', function (done) {
    const uniquemail = `test${Date.now()}@mailinator.com`;
    const requestData: any = {
      firstName: 'token',
      lastName: 'user3',
      email: uniquemail,
    };
    const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token} Invalid`,
    });

    erc1155
      .enrollUser(requestData)
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
  it('It should returns enroll user object', function (done) {
    const uniquemail = `test${Date.now()}@mailinator.com`;
    const requestData: any = {
      firstName: 'token',
      lastName: 'user3',
      email: uniquemail,
    };
    const erc1155 = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc1155
      .enrollUser(requestData)
      .then(data => {
        expect(data)
          .to.be.an('object')
          .with.all.keys(
            'id',
            'firstName',
            'lastName',
            'username',
            'uuid',
            'role',
            'status',
            'email',
            'chaincode',
            'channel',
            '_id',
            'createdAt',
            'updatedAt',
            'clientId'
          );
        expect(data.id).to.be.an('string');
        expect(data.firstName).to.be.an('string');
        expect(data.lastName).to.be.an('string');
        expect(data.role).to.be.an('string');
        expect(data.status).to.be.an('string');
        expect(data.email).to.be.an('string');
        expect(data.chaincode).to.be.an('string');
        expect(data.channel).to.be.an('string');
        expect(data.uuid).to.be.an('string');
        expect(data.username).to.be.an('string');
        expect(data.createdAt).to.be.an('string');
        expect(data.updatedAt).to.be.an('string');
        expect(data._id).to.be.an('string');
        enrollUser = data;
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('Account Data', function () {
  const data: IAccount = {
    userId: enrollUser.uuid,
    ...chainCodeData,
  };

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
      .getAccount({ userId: 'test', ...chainCodeData })
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
  it('It should return "account get successfully"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getAccount({ ...chainCodeData }) // if not pass any userId then it return admin account name
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
  it('get Account of user "account get successfully"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getAccount(data) // if not pass any userId then it return admin account name
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
});

describe('Mint Token', function () {
  const data: IMintBody = {
    value: '1000',
    ...chainCodeData,
  };

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
    const wrongData = { value: '' };
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
        tokenId = parseInt(data.tokenId);
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
});

describe('Batch Mint Token', function () {
  const data: IBatchMintBody = {
    value: [1000, 1000],
  };
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
        expect(data.tokenId).to.be.an('array');
        expect(data.minter).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
});

describe('Get balance', function () {
  const data: IBalance = {
    // userId: 'WnCrk4D4z8Xg3LQi',
    tokenId: parseInt(tokenId),
    ...chainCodeData,
  };
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
      .getBalance({ userId: 'test', ...data })
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

  //success response
  it('It should return "Balance get successfully"', done => {
    data.tokenId = parseInt(tokenId);
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getBalance(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('balance');
        expect(data.balance).to.be.an('number');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
  //success response
  it('Get balance of spacific user "Balance get successfully"', done => {
    data.tokenId = parseInt(tokenId);
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getBalance({ userId: enrollUser.username, ...data })
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('balance');
        expect(data.balance).to.be.an('number');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
});

describe('getting Batch Balance of multiple users', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IBatchBalance = {
      userId: [adminUserName, enrollUser.username],
      tokenId: [parseInt(tokenId), parseInt(tokenId)],
      ...chainCodeData,
    };
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
    const data: IBatchBalance = {
      userId: [adminUserName, enrollUser.username],
      tokenId: [parseInt(tokenId), parseInt(tokenId)],
      ...chainCodeData,
    };
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
    const data: IBatchBalance = { userId: ['test'], tokenId: [parseInt(tokenId)], ...chainCodeData };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
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
  //success response
  it('It should return "Balance get successfully"', done => {
    const data: IBatchBalance = {
      userId: [adminUserName, enrollUser.username],
      tokenId: [parseInt(tokenId), parseInt(tokenId)],
      ...chainCodeData,
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getBatchBalance(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('balance');
        expect(data.balance).to.be.an('array');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
});

describe('Set Token URI', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: ISetURIBody = {
      tokenId,
      URL: `http://localhost/${tokenId}`,
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Token URI get successfully"', done => {
    const data: ISetURIBody = {
      tokenId,
      URL: `http://localhost/${tokenId}`,
      ...chainCodeData,
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .setTokenURI(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('tokenId', 'URI');
        expect(data.tokenId).to.be.an('number');
        expect(data.URI).to.be.an('string');
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('Get the Token URI', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
    });
    erc1155Data
      .getTokenURI({ tokenId, ...chainCodeData })
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
      .getTokenURI({ tokenId, ...chainCodeData })
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
  //success response
  it('It should return "Token URI get successfully"', done => {
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .getTokenURI({ tokenId, ...chainCodeData })
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
});

describe('Token Transfer', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: ITokenTransferBody = {
      to: enrollUser.username,
      tokenId,
      value: '10',
      ...chainCodeData,
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
      to: enrollUser.username,
      tokenId,
      value: '10',
      ...chainCodeData,
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
      to: enrollUser.username,
      tokenId: '',
      value: '10',
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Token transfer successfully"', done => {
    const data: ITokenTransferBody = {
      to: enrollUser.username,
      tokenId,
      value: '18',
      ...chainCodeData,
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .tokenTransfer(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('from', 'to');
        expect(data.from).to.be.an('string');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
});

describe('Batch Token Transfer', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IBatchTokenTransferBody = {
      to: enrollUser.username,
      tokenId: [parseInt(tokenId)],
      value: [10],
      ...chainCodeData,
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
      to: enrollUser.username,
      tokenId: [tokenId],
      value: [10],
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Token transfer successfully"', done => {
    const data: IBatchTokenTransferBody = {
      to: enrollUser.username,
      tokenId: [parseInt(tokenId)],
      value: [10],
      ...chainCodeData,
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .batchTokenTransfer(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('from', 'to');
        expect(data.from).to.be.an('string');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
});

describe('Approve permission to the user', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IApproveBody = {
      spender: enrollUser.username,
      value: '100',
      ...chainCodeData,
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
      spender: enrollUser.username,
      value: '100',
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Operator get successfully"', done => {
    const data: IApproveBody = {
      spender: enrollUser.username,
      value: '100',
      ...chainCodeData,
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
        expect(data.allowanceAmount).to.be.an('number');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
});

describe('Get Approve status', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IApproveStatusBody = {
      spender: enrollUser.username,
      ...chainCodeData,
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
      spender: enrollUser.username,
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Spender request status"', done => {
    const data: IApproveStatusBody = {
      spender: enrollUser.username,
      ...chainCodeData,
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
});

describe('Batch Token Transfer from multiple users', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IMultiUserTokenTransferBody = {
      to: [enrollUser.username],
      tokenId: [parseInt(tokenId)],
      value: [10],
      ...chainCodeData,
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
      to: [enrollUser.username],
      tokenId: [parseInt(tokenId)],
      value: [10],
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Token transfer successfully"', done => {
    const data: IMultiUserTokenTransferBody = {
      to: [enrollUser.username],
      tokenId: [parseInt(tokenId)],
      value: [10],
      ...chainCodeData,
    };
    const erc1155Data = new ERC1155({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc1155Data
      .tokenTransferMultiUsers(data)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('from', 'to');
        expect(data.from).to.be.an('string');
        expect(data.to).to.be.an('array');
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
});

describe('Burn Token', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: any = {
      tokenId,
      value: '10',
      ...chainCodeData,
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
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Token burn successfully"', done => {
    const data: IBurnBody = {
      tokenId: tokenId.toString(),
      value: '10',
      ...chainCodeData,
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
});

describe('Batch Burn Token', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IBatchBurnBody = {
      tokenId: [tokenId, tokenId],
      value: [10, 10],
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Token burn successfully"', done => {
    const data: IBatchBurnBody = {
      tokenId: [parseInt(tokenId), parseInt(tokenId)],
      value: [10, 10],
      ...chainCodeData,
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
});
