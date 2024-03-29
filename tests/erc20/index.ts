import { expect } from 'chai';
import { DEFAULT_NETWORK } from '../../src/util/constant';
import { ERC20 } from '../../src';
import dotenv from 'dotenv';
const envFound = dotenv.config();

const settings = { network: DEFAULT_NETWORK };
let token, enrollUser, transferToken;
const chainCodeData = {
  chaincode: process.env.CHAIN_CODE_20,
  channel: process.env.CHANNEL_20,
};

describe('Authenticate user', function () {
  it('It should returns invalid user or user not found', function (done) {
    const authSettings = {
      clientId: process.env.INVALID_CLIENT_ID,
      secretKey: process.env.INVALID_SECRET_KEY,
    };

    const erc20 = new ERC20(settings);
    erc20
      .authenticate(authSettings)
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
  it('It should return client id is not allowed to be empty', function (done) {
    const authSettings = {
      clientId: '',
      secretKey: '',
    };

    const erc20 = new ERC20(settings);
    erc20
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
  it('It should return secret key is required', function (done) {
    const authSettings = {
      clientId: process.env.TOKEN_ENGINE_CLIENT_ID,
      secretKey: '',
    };

    const erc20 = new ERC20(settings);
    erc20
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
  it('It should return client id is required', function (done) {
    const authSettings = {
      clientId: '',
      secretKey: process.env.TOKEN_ENGINE_SECRET_KEY,
    };

    const erc20 = new ERC20(settings);
    erc20
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

    const erc20 = new ERC20(settings);
    erc20
      .authenticate(authSettings)
      .then(data => {
        token = data.token;
        expect(data).to.be.an('object').with.all.keys('id', 'email', 'token', 'username');
        expect(data.id).to.be.an('string');
        expect(data.email).to.be.an('string');
        expect(data.token).to.be.an('string');
        expect(data.username).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
      });
  });
});

describe('Mint token', function () {
  const requestData: any = {
    value: '1000',
    ...chainCodeData,
  };
  it('It should return Authorization token not found', function (done) {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .mintToken(requestData)
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
  it('It should return invalid auth token', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });
    erc20
      .mintToken(requestData)
      .then((data: any) => {
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
  it('It should return value is required', function (done) {
    const data = {
      value: '',
    };
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    erc20
      .mintToken(data)
      .then((data: any) => {
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
  it('It should returns token minted data', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .mintToken(requestData)
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('minter', 'balance');
        expect(data.minter).to.be.an('string');
        expect(data.balance).to.be.an('number');
        done();
      })
      .catch(error => {
        expect(error);
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
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
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
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
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
    const uniquemail = `k.koul${Date.now()}@edexa.team`;
    const requestData: any = {
      firstName: 'token',
      lastName: 'user3',
      email: uniquemail,
    };
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token} Invalid`,
    });

    erc20
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
    const uniquemail = `k.koul${Date.now()}@edexa.team`;
    const requestData: any = {
      firstName: 'token',
      lastName: 'user3',
      email: uniquemail,
    };
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
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
        expect(error);
      });
  });
  it('It should returns enroll user 2', function (done) {
    const uniquemail = `k.koul${Date.now()}2@edexa.team`;
    const requestData: any = {
      firstName: 'token',
      lastName: 'user2',
      email: uniquemail,
    };
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
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
        transferToken = data;
        done();
      })
      .catch(error => {
        expect(error);
      });
  });
});

describe('AccountId of users', function () {
  it('It should return Authorization token not found', function (done) {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .getAccountId({ userId: enrollUser.uuid })
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
  it('It should returns userId is required', function (done) {
    const data = {
      userId: '',
    };
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .getAccountId(data)
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
  it('It should returns invalid auth token', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });

    erc20
      .getAccountId({ userId: enrollUser.uuid })
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
  it('It should returns accountId of user object', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .getAccountId({ userId: enrollUser.uuid })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('username');
        expect(data.username).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
      });
  });
});

describe('TransferToken to users', function () {
  it('It should return Authorization token not found', function (done) {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .transferToken({
        to: enrollUser.username,
        value: '50',
        ...chainCodeData,
      })
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
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });

    erc20
      .transferToken({
        to: '',
        value: '100',
        ...chainCodeData,
      })
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
  it('It should returns to is required', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .transferToken({
        to: '',
        value: '100',
        ...chainCodeData,
      })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        expect(error);
        expect(error).to.be.an('object');
        done();
      });
  });
  it('It should returns invalid user', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .transferToken({
        to: 'kk@edexa',
        value: '100',
        ...chainCodeData,
      })
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
  it('It should returns transfer token to user object', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .transferToken({
        to: enrollUser.username,
        value: '100',
        ...chainCodeData,
      })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('to', 'from', 'updatedBalance');
        expect(data.to).to.be.an('string');
        expect(data.from).to.be.an('string');
        expect(data.updatedBalance).to.be.an('number');
        done();
      })
      .catch(error => {
        expect(error);
      });
  });
});

describe('Get Balance', function () {
  it('It should return Authorization token not found', function (done) {
    const requestData: any = {
      ...chainCodeData,
    };
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .getBalance(requestData)
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
  it('It should returns invalid user', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .getBalance({ userId: 'kk@edexa', ...chainCodeData })
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
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });

    erc20
      .getBalance({ userId: 'kk@edexa', ...chainCodeData })
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
  it('It should returns balance object', function (done) {
    const requestData: any = {
      ...chainCodeData,
    };
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .getBalance(requestData)
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('balance');
        expect(data.balance).to.be.an('number');
        done();
      })
      .catch(error => {
        expect(error);
      });
  });
  it('It should returns balance object of user', function (done) {
    const requestData: any = {
      ...chainCodeData,
    };
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .getBalance({ userId: enrollUser.username, ...chainCodeData })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('balance');
        expect(data.balance).to.be.an('number');
        done();
      })
      .catch(error => {
        expect(error);
      });
  });
});

describe('Total Supply', function () {
  const requestData = {
    ...chainCodeData,
  };
  it('It should return Authorization token not found', done => {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .totalSupply(requestData)
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
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });

    erc20
      .totalSupply(requestData)
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
  it('It should returns total supply object', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .totalSupply(requestData)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('supply');
        expect(data.supply).to.be.an('number');
        done();
      })
      .catch(error => {
        expect(error);
      });
  });
});

describe('Burn Token', function () {
  const requestData = {
    value: '20',
    ...chainCodeData,
  };
  it('It should return Authorization token not found', function (done) {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .burnToken(requestData)
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
  it('It should returns value is required', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .burnToken({ value: '', ...chainCodeData })
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
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });

    erc20
      .burnToken(requestData)
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
  it('It should returns burn token object', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .burnToken(requestData)
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('burner', 'updatedBalance');
        expect(data.burner).to.be.an('string');
        expect(data.updatedBalance).to.be.an('number');
        done();
      })
      .catch(error => {
        expect(error);
      });
  });
});

describe('Set operator for token', function () {
  it('It should return Authorization token not found', function (done) {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .setOperator({
        spender: enrollUser.username,
        value: '100',
        ...chainCodeData,
      })
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
  it('It should returns value is required', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .setOperator({
        spender: enrollUser.username,
        value: '',
        ...chainCodeData,
      })
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
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });

    erc20
      .setOperator({
        spender: enrollUser.username,
        value: '100',
        ...chainCodeData,
      })
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
  it('It should returns spender is required', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .setOperator({
        spender: '',
        value: '100',
        ...chainCodeData,
      })
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
  it('It should returns invalid spender', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .setOperator({
        spender: 'kk@edexa',
        value: '100',
        ...chainCodeData,
      })
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
  it('It should returns set operator for token object', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .setOperator({
        spender: enrollUser.username,
        value: '100',
        ...chainCodeData,
      })
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('allowanceAmount', 'to');
        expect(data.allowanceAmount).to.be.an('number');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
      });
  });
});

describe('check spender allowance limit for token', function () {
  it('It should return Authorization token not found', function (done) {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .checkAllowanceLimit({
        spender: enrollUser.username,
        ...chainCodeData,
      })
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
  it('It should returns spender is required', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .checkAllowanceLimit({ spender: '', ...chainCodeData })
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
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });

    erc20
      .checkAllowanceLimit({ spender: enrollUser.username, ...chainCodeData })
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
  it('It should returns invalid spender', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .checkAllowanceLimit({ spender: 'kk@edexa', ...chainCodeData })
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
  it('It should returns allowance limit for token object', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .checkAllowanceLimit({
        spender: enrollUser.username,
        ...chainCodeData,
      })
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('allowanceLimit', 'to');
        expect(data.allowanceLimit).to.be.an('number');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        expect(error);
      });
  });
});

describe('TransferToken from one to another users', function () {
  it('It should return Authorization token not found', done => {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .transferTokenFrom({
        to: transferToken.username,
        from: enrollUser.username,
        value: '20',
        ...chainCodeData,
      })
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
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token} invalid`,
    });

    erc20
      .transferTokenFrom({
        to: transferToken.username,
        from: enrollUser.username,
        value: '10',
        ...chainCodeData,
      })
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
  it('It should returns to is required', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .transferTokenFrom({
        to: '',
        from: enrollUser.username,
        value: '10',
        ...chainCodeData,
      })
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
  it('It should returns invalid to value', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .transferTokenFrom({
        to: 'kk@edexa',
        from: enrollUser.username,
        value: '10',
        ...chainCodeData,
      })
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
  it('It should returns transfer token from one to another user object', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .transferTokenFrom({
        to: transferToken.username,
        from: enrollUser.username,
        value: '10',
        ...chainCodeData,
      })
      .then(data => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('to', 'spender', 'updatedBalance');
        expect(data.to).to.be.an('string');
        expect(data.spender).to.be.an('string');
        expect(data.updatedBalance).to.be.an('number');
        done();
      })
      .catch(error => {
        expect(error);
      });
  });
});
