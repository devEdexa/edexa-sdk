import { expect } from 'chai';
import { DEFAULT_NETWORK } from '../../src/util/constant';
import { ERC20 } from '../../src';
import dotenv from 'dotenv';
const envFound = dotenv.config();

const settings = { network: DEFAULT_NETWORK };
let token, enrollUser, transferToken;
const invalidAuthToken = process.env.INVALID_AUTH_TOKEN;
const invalidFileId = '00000657f9275197e4c00000';

describe('Authenticate user', function () {
  it('It should returns information about user', function (done) {
    const authSettings = {
      headers: {
        'client-id': process.env.TOKEN_ENGINE_CLIENT_ID,
        'secret-key': process.env.TOKEN_ENGINE_SECRET_KEY,
      },
    };

    const erc20 = new ERC20(settings);
    erc20
      .authenticate(authSettings)
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('id', 'email', 'token', 'username');
        expect(data.id).to.be.an('string');
        expect(data.email).to.be.an('string');
        expect(data.token).to.be.an('string');
        expect(data.username).to.be.an('string');
        token = data.token;
        done();
      })
      .catch(error => {
        console.log({ error });
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
      headers: {
        'client-id': '',
        'secret-key': '',
      },
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
      headers: {
        'client-id': process.env.TOKEN_ENGINE_CLIENT_ID,
        'secret-key': '',
      },
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
      headers: {
        'client-id': '',
        'secret-key': process.env.TOKEN_ENGINE_SECRET_KEY,
      },
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
});

describe('Mint token', function () {
  const requestData: any = {
    value: '1000',
  };
  it('It should return Authorization token not found', done => {
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

  // it('It should return value is required', done => {
  //   const erc20 = new ERC20({
  //     ...settings,
  //     authorization: `Bearer ${token}`,
  //   });
  //   erc20
  //     .mintToken({ value: '' })
  //     .then((data: any) => {
  //       expect(data)
  //       done();
  //     })
  //     .catch(error => {
  //       expect(error).to.be.an('object');
  //       expect(error.status).to.be.an('number');
  //       expect(error.message).to.be.an('string');
  //       done();
  //     });
  // });

  it('It should returns token minted data', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .mintToken(requestData)
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('balance', 'minter');
        expect(data.balance).to.be.an('number');
        expect(data.minter).to.be.an('string');
        done();
      })
      .catch(error => {
        console.log({ error });
        done();
      });
  });
});

describe('BalanceOf', function () {
  it('It should return Authorization token not found', done => {
    const requestData: any = {
      // value: '1000',
    };
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .balanceOf(requestData)
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

  it('It should returns balance object', function (done) {
    const requestData: any = {};
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .balanceOf(requestData)
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('balance');
        expect(data.balance).to.be.an('number');
        done();
      })
      .catch(error => {
        console.log({ error });
        done();
      });
  });
});

describe('Enroll users', function () {
  it('It should return Authorization token not found', done => {
    const requestData: any = {
      firstName: 'token',
      lastName: 'user3',
      phone: '148424673678',
      role: 'user',
      countryCode: '+91',
      location: 'test',
      email: 'kk03@edexa.team',
      serviceName: 'erc20',
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

  it('It should returns enroll user object', function (done) {
    const uniquemail = `k.koul${Date.now()}@edexa.team`;
    const requestData: any = {
      firstName: 'token',
      lastName: 'user3',
      phone: '148424673678',
      role: 'user',
      countryCode: '+91',
      location: 'test',
      email: uniquemail,
      serviceName: 'erc20',
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
            'phone',
            'role',
            'status',
            'email',
            'chaincode',
            'channel',
            'profilePic',
            '_id',
            'createdAt',
            'updatedAt',
            'loginType',
            'clientId'
          );
        expect(data.id).to.be.an('string');
        expect(data.firstName).to.be.an('string');
        expect(data.lastName).to.be.an('string');
        expect(data.phone).to.be.an('string');
        expect(data.role).to.be.an('string');
        expect(data.status).to.be.an('string');
        expect(data.email).to.be.an('string');
        expect(data.chaincode).to.be.an('string');
        expect(data.channel).to.be.an('string');
        expect(data.profilePic).to.be.an('string');
        expect(data.uuid).to.be.an('string');
        expect(data.username).to.be.an('string');
        expect(data.loginType).to.be.an('null');
        expect(data.createdAt).to.be.an('string');
        expect(data.updatedAt).to.be.an('string');
        expect(data._id).to.be.an('string');
        enrollUser = data;
        done();
      })
      .catch(error => {
        console.log({ error });
        done();
      });
  });
});

describe('AccountId of users', function () {
  it('It should return Authorization token not found', done => {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .accountId({ userId: enrollUser.uuid })
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
      .accountId({ userId: enrollUser.uuid })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('username');
        expect(data.username).to.be.an('string');
        done();
      })
      .catch(error => {
        console.log({ error });
        done();
      });
  });
});

describe('TransferToken to users', function () {
  it('It should return Authorization token not found', done => {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .transferToken({
        to: enrollUser.username,
        value: '50',
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

  it('It should returns transfer token to user object', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .transferToken({
        to: enrollUser.username,
        value: '100',
      })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('to', 'from', 'updatedBalance');
        expect(data.to).to.be.an('string');
        expect(data.from).to.be.an('string');
        expect(data.updatedBalance).to.be.an('number');
        transferToken = data;
        done();
      })
      .catch(error => {
        console.log({ error });
        done();
      });
  });
});

describe('Total Supply', function () {
  const requestData = {};
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
        expect(data).to.be.an('object').with.all.keys('supply');
        expect(data.supply).to.be.an('number');
        done();
      })
      .catch(error => {
        console.log({ error });
        done();
      });
  });
});

describe('Burn Token', function () {
  const requestData = {
    value: '20',
  };
  it('It should return Authorization token not found', done => {
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
        expect(data).to.be.an('object').with.all.keys('burner', 'updatedBalance');
        expect(data.burner).to.be.an('string');
        expect(data.updatedBalance).to.be.an('number');
        done();
      })
      .catch(error => {
        console.log({ error });
        done();
      });
  });
});

describe('Set operator for token', function () {
  it('It should return Authorization token not found', done => {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .setOperator({
        spender: enrollUser.username,
        value: '100',
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

  it('It should returns set operator for token object', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .setOperator({
        spender: enrollUser.username,
        value: '100',
      })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('allowanceAmount', 'to');
        expect(data.allowanceAmount).to.be.an('number');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        console.log({ error });
        done();
      });
  });
});

describe('check spender allowance limit for token', function () {
  it('It should return Authorization token not found', done => {
    const erc20 = new ERC20({
      ...settings,
    });
    erc20
      .checkAllowanceLimit({
        spender: enrollUser.username,
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

  it('It should returns allowance limit for token object', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .checkAllowanceLimit({
        spender: enrollUser.username,
      })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('allowanceLimit', 'to');
        expect(data.allowanceLimit).to.be.an('number');
        expect(data.to).to.be.an('string');
        done();
      })
      .catch(error => {
        console.log({ error });
        done();
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
        to: enrollUser.username,
        from: transferToken.to,
        value: '20',
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

  it('It should returns transfer token from one to another user object', function (done) {
    const erc20 = new ERC20({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    erc20
      .transferTokenFrom({
        to: enrollUser.username,
        from: transferToken.to,
        value: '10',
      })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('to', 'spender', 'updatedBalance');
        expect(data.to).to.be.an('string');
        expect(data.spender).to.be.an('string');
        expect(data.updatedBalance).to.be.an('number');
        done();
      })
      .catch(error => {
        console.log({ error });
        done();
      });
  });
});
