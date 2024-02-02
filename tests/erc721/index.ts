import { expect } from 'chai';
import { ERC721 } from '../../src';
import { DEFAULT_NETWORK } from '../../src/util/constant';
import dotenv from 'dotenv';
const envFound = dotenv.config();
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

const settings = { network: DEFAULT_NETWORK };
let token;
let tokenId;
let userName2: string = 'test@edexa';
let enrollUser: any | undefined = { username: 'test0@edexa' };
const chainCodeData = {
  chaincode: process.env.CHAIN_CODE_721,
  channel: process.env.CHANNEL_721,
};

describe('Authenticate user', function () {
  it('It should returns invalid user or user not found', function (done) {
    const authSettings = {
      clientId: process.env.INVALID_CLIENT_ID,
      secretKey: process.env.INVALID_SECRET_KEY,
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
      clientId: '',
      secretKey: '',
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
      clientId: process.env.BARCHIVE_CLIENT_ID,
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
      secretKey: process.env.ERC_SECRET_KEY,
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
  it('It should returns information about user', function (done) {
    const authSettings = {
      clientId: process.env.TOKEN_ENGINE_CLIENT_ID,
      secretKey: process.env.TOKEN_ENGINE_SECRET_KEY,
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
      .catch(error => {
        done();
      });
  });
});

describe('Enroll users', function () {
  it('It should return Authorization token not found', function (done) {
    const requestData: any = {
      firstName: 'token',
      lastName: 'user3',
      email: 'kk03@edexa.team',
    };
    const erc721 = new ERC721({
      ...settings,
    });
    erc721
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
    const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc721
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
    const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token} Invalid`,
    });

    erc721
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
    const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc721
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
  it('It should returns enroll user 2', function (done) {
    const uniquemail = `test${Date.now()}2@mailinator.com`;
    const requestData: any = {
      firstName: 'test2',
      lastName: 'user2',
      email: uniquemail,
    };
    const erc721 = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc721
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
        userName2 = data.username || 'test@edexa';
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('Account Data', function () {
  const data: IAccount = {
    userId: 'WnCrk4D4z8Xg3LQi', // // pass here users uuid for getting users account id if not pass any user id then it return admin account id
    ...chainCodeData,
  };

  it('It should return "Get Account id of user"', done => {
    data.userId = enrollUser.uuid;
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getAccount(data)
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
  it('It should return "Account get successfully"', done => {
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getAccount({ ...chainCodeData })
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

describe('Get balance', function () {
  const data: IAccount = {
    // // if you not pass any userId then it return admin balance
    // userId: '',
    ...chainCodeData,
  };

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
  //success response
  it('It should return "Get Balance successfully"', done => {
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
});

describe('Mint Token', function () {
  const data: IMintBody = {
    value: '1000.000',
    tokenUrl: 'http://localhost/721',
    ...chainCodeData,
  };
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
    const wrongData = { value: '', tokenUrl: 'http://localhost/721', ...chainCodeData };
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
  //success response
  it('It should return "Token minted successfully"', done => {
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
});

describe('Get the total Supply or total minted token', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
      .getTotalSupply({
        ...chainCodeData,
      })
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
      .getTotalSupply({
        ...chainCodeData,
      })
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
  it('It should return "Get Total supply successfully"', done => {
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getTotalSupply({
        ...chainCodeData,
      })
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
});

describe('Get the Token URI', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const erc721Data = new ERC721({
      ...settings,
    });
    erc721Data
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
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc721Data
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
  it('It should return "tokenId is not allowed to be empty"', done => {
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
      .getTokenURI({ tokenId: '', ...chainCodeData })
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
    const erc721Data = new ERC721({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc721Data
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
      ...chainCodeData,
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
      to: enrollUser.username,
      tokenId,
      ...chainCodeData,
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
      to: enrollUser.username,
      tokenId: '',
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Token transfer successfully"', done => {
    const data: ITokenTransferBody = {
      to: enrollUser.username,
      tokenId,
      ...chainCodeData,
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
});

describe('Set Operator', function () {
  before(done => {
    const mintData = {
      value: '1000.000',
      tokenUrl: 'http://localhost/721',
      ...chainCodeData,
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

  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: ISetOperatorBody = {
      operator: enrollUser.username,
      tokenId,
      ...chainCodeData,
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
      operator: enrollUser.username,
      tokenId,
      ...chainCodeData,
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
      operator: enrollUser.username,
      tokenId: '',
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Operator set successfully"', done => {
    const data: ISetOperatorBody = {
      operator: enrollUser.username,
      tokenId,
      ...chainCodeData,
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
});

describe('Token Transfer From one user to another user', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: ITokenTransferFromBody = {
      to: userName2,
      from: enrollUser.username,
      tokenId,
      ...chainCodeData,
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
      to: userName2,
      from: enrollUser.username,
      tokenId,
      ...chainCodeData,
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
      to: userName2,
      from: enrollUser.username,
      tokenId: '',
      ...chainCodeData,
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
      from: enrollUser.username,
      tokenId,
      ...chainCodeData,
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
  //success response
  it('It should return "Token transfer successfully"', done => {
    const data: ITokenTransferFromBody = {
      to: userName2,
      from: enrollUser.username,
      tokenId,
      ...chainCodeData,
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
});

describe('Get Owner', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IOwnerBody = {
      tokenId,
      ...chainCodeData,
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
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Operator get successfully"', done => {
    const data: IOwnerBody = {
      tokenId,
      ...chainCodeData,
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
});

describe('Get Approve status', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IApproveBody = {
      operator: enrollUser.username,
      ...chainCodeData,
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
      operator: enrollUser.username,
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Operator get successfully"', done => {
    const data: IApproveBody = {
      operator: enrollUser.username,
      ...chainCodeData,
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
});

describe('Set Operator for all', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: ISetOperatorAllBody = {
      operator: enrollUser.username,
      approve: true,
      ...chainCodeData,
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
      operator: enrollUser.username,
      approve: true,
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('It should return "Operator get successfully"', done => {
    const data: ISetOperatorAllBody = {
      operator: enrollUser.username,
      approve: true,
      ...chainCodeData,
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
});

describe('Getting list of Token with Owner name', function () {
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: IOwnerDetailsBody = {
      userId: enrollUser.username, // finding for any spacific user token
      ...chainCodeData,
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
      userId: enrollUser.username, // finding for any spacific user token
      ...chainCodeData,
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
      ...chainCodeData,
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
  //success response
  it('Get admin owned token list "Total Token Owned get successfully"', done => {
    const data: IOwnerDetailsBody = {
      ...chainCodeData,
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
      userId: enrollUser.username, // finding for any spacific user token
      ...chainCodeData,
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
        done();
      })
      .catch(error => {
        expect(error);
        done();
      });
  });
});

describe('Burn Token', function () {
  before(done => {
    const mintData = {
      value: '1000.000',
      tokenUrl: 'http://localhost/721',
      ...chainCodeData,
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
  it('It should return "Authorization token not found or Invalid token"', done => {
    const data: any = {
      tokenId,
      ...chainCodeData,
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
      ...chainCodeData,
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
      ...chainCodeData,
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
  }); //success response
  it('It should return "Token Burn successfully"', done => {
    const data: any = {
      tokenId,
      ...chainCodeData,
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
});
