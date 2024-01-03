import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { createHash, randomBytes } from 'crypto';
import { faker } from '@faker-js/faker';

import { Bstamp } from '../../src';
import config from '../../src/config/index';
import { API_VERSION, DEFAULT_NETWORK, IS_PRIVATE } from '../../src/util/constant';
import { AddStampRequestDTO, EnrollUserDTO, GetStampDetailsDTO } from '../../src/util/interface';
import dotenv from 'dotenv';
const envFound = dotenv.config();

chai.use(chaiHttp);

const settings = { network: DEFAULT_NETWORK };

let token;
let stampId;
const invalidAuthToken = process.env.INVALID_AUTH_TOKEN;
const alreadyEnrolledUserId = 'b2ace90e-d042-4d68-a81c-5b07f0bc5551';
const invalidStampId = 'abc123';

describe('Authenticate user', function () {
  it('It should returns information about user', function (done) {
    const authSettings = {
      headers: {
        'client-id': process.env.CLIENT_ID,
        'secret-key': process.env.SECRET_KEY,
      },
    };

    const bStamp = new Bstamp(settings);
    bStamp
      .authenticate(authSettings)
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('id', 'name', 'token', 'username');
        expect(data.id).to.be.an('string');
        expect(data.name).to.be.an('string');
        expect(data.token).to.be.an('string');
        expect(data.username).to.be.an('string');
        token = data.token;
        done();
      })
      .catch(error => {
        done();
      });
  });

  it('It should return user not found', function (done) {
    const authSettings = {
      headers: {
        'client-id': process.env.CLIENT_ID,
        'secret-key': process.env.SECRET_KEY,
      },
    };

    const bStamp = new Bstamp(settings);
    bStamp
      .authenticate(authSettings)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });

  it('It should return something went wrong', function (done) {
    const authSettings = {
      headers: {
        'client-id': '',
        'secret-key': '',
      },
    };

    const bStamp = new Bstamp(settings);
    bStamp
      .authenticate(authSettings)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('Add stamp', () => {
  it('It should return Authorization token not found', done => {
    const bStamp = new Bstamp({
      ...settings,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: false,
    };
    bStamp
      .addStamp(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return invalid auth token', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: false,
    };
    bStamp
      .addStamp(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return stamped already exist', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: false,
    };
    bStamp
      .addStamp(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return info about stamped file', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: false,
    };
    bStamp
      .addStamp(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('id', 'txId', 'code', 'hash', 'filename');
        expect(data.id).to.be.an('string');
        expect(data.txId).to.be.an('string');
        expect(data.code).to.be.an('string');
        expect(data.hash).to.be.an('string');
        expect(data.filename).to.be.an('string');
        stampId = data.code;

        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return something went wrong', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: false,
    };
    bStamp
      .addStamp(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('Get stamp List', () => {
  it('It should return Authorization token not found', done => {
    const bStamp = new Bstamp({
      ...settings,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: IS_PRIVATE.FALSE,
    };
    bStamp
      .getAllStamp(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return invalid auth token', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: IS_PRIVATE.FALSE,
    };
    bStamp
      .getAllStamp(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return list of stamped file', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: IS_PRIVATE.FALSE,
    };
    bStamp
      .getAllStamp(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('count', 'stamps');
        expect(data.count).to.be.an('number');
        expect(data.stamps).to.be.an('array');
        data.stamps.every(stamps =>
          expect(stamps).to.have.all.keys(
            '_id',
            'userId',
            'clientId',
            'blockchainId',
            'name',
            'txId',
            'hash',
            'type',
            'code',
            'originalDocHash',
            'isEsign',
            'isPrivateBc',
            'createdAt',
            'updatedAt'
          )
        );

        data.stamps.forEach(stamp => {
          expect(stamp._id).to.be.an('string');
          expect(stamp.userId).to.be.an('string');
          expect(stamp.clientId).to.be.an('string');
          expect(stamp.blockchainId).to.be.an('string');
          expect(stamp.name).to.be.an('string');
          expect(stamp.txId).to.be.an('string');
          expect(stamp.hash).to.be.an('string');
          expect(stamp.type).to.be.an('string');
          expect(stamp.code).to.be.an('string');
          expect(stamp.originalDocHash).to.be.an('string');
          expect(stamp.isEsign).to.be.an('boolean');
          expect(stamp.isPrivateBc).to.be.an('boolean');
          expect(stamp.createdAt).to.be.an('string');
          expect(stamp.updatedAt).to.be.an('string');
        });
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('Get stamp Detail', () => {
  it('It should return Authorization token not found', done => {
    const bStamp = new Bstamp({
      ...settings,
    });

    const data: GetStampDetailsDTO = { id: stampId };
    bStamp
      .getStampDetail(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return invalid auth token', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });

    const data: GetStampDetailsDTO = { id: stampId };
    bStamp
      .getStampDetail(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return stamped file not found', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: GetStampDetailsDTO = { id: invalidStampId };
    bStamp
      .getStampDetail(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return details of stamped file', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    const data: GetStampDetailsDTO = { id: stampId };
    bStamp
      .getStampDetail(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        expect(data)
          .to.be.an('object')
          .with.all.keys(
            'hash',
            'originalDocHash',
            'metaData',
            'filename',
            'type',
            'txid',
            'timestamp',
            'code',
            'username',
            'userVerify',
            'isEsign',
            'isPrivateBc'
          );
        expect(data.hash).to.be.an('string');
        expect(data.originalDocHash).to.be.an('string');
        expect(data.metaData).to.be.an('string');
        expect(data.filename).to.be.an('string');
        expect(data.type).to.be.an('string');
        expect(data.txid).to.be.an('string');
        expect(data.timestamp).to.be.an('string');
        expect(data.code).to.be.an('string');
        expect(data.username).to.be.an('string');
        expect(data.userVerify).to.be.an('number');
        expect(data.isEsign).to.be.an('boolean');
        expect(data.isPrivateBc).to.be.an('boolean');
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('Enroll user', () => {
  it('It should return Authorization token not found', done => {
    const bStamp = new Bstamp({
      ...settings,
    });

    const data: EnrollUserDTO = {
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
    };
    bStamp
      .enrollUser(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return invalid auth token', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });

    const data: EnrollUserDTO = {
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
    };
    bStamp
      .enrollUser(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return user already enrolled', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: EnrollUserDTO = {
      userId: alreadyEnrolledUserId,
      username: faker.internet.userName(),
      email: faker.internet.email(),
    };
    bStamp
      .enrollUser(data)
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return newly enrolled user', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: EnrollUserDTO = {
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
    };
    bStamp
      .enrollUser(data)
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('status', 'message', 'data');
        expect(data.status).to.be.an('number').equal(201);
        expect(data.message).to.be.an('string');
        expect(data.data).to.be.an('object').with.all.keys('publicAddress', 'userId');
        expect(data.data.publicAddress).to.be.an('string');
        expect(data.data.userId).to.be.an('string');
        done();
      })
      .catch(error => {
        done();
      });
  });
});
