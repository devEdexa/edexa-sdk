import { Bstamp } from '../../src';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { API_VERSION, DEFAULT_NETWORK } from '../../src/util/constant';
import { createHash, randomBytes } from 'crypto';
import { faker } from '@faker-js/faker';
import { AddStampRequestDTO, EnrollUserDTO, GetStampDetailsDTO } from '../../src/util/interface';

chai.use(chaiHttp);

const settings = { network: DEFAULT_NETWORK };
const authSettings = {
  headers: {
    'client-id': 'b1451bc9-4d8a-4e51-838c-c2341a1c13c3',
    'secret-key':
      'F7D866D57ACA8071817D28A49C81CDDEE74899492B11C2FE3FE9818368956DC91150C138AC46770B273FE8E7665C2D41DE1A11A728D318CB86BC4627C72FA58A',
  },
};

let token;
let stampId;
describe('Authenticate user', function () {
  it('It should returns information about user', function (done) {
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
        done(new Error(error));
      });
  });
});

describe('Add stamp', () => {
  it.skip('It should return info about stamped file', done => {
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
        done(new Error(error.message));
      });
  });
});

describe('Get stamp List', () => {
  it('It should return list of stamped file', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: true,
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
        done(new Error(error.message));
      });
  });
});

describe('Get stamp Detail', () => {
  it('It should return details of stamped file', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: GetStampDetailsDTO = { id: stampId };
    bStamp
      .getStampDetail(data, { version: API_VERSION.VERSION_1 })
      .then(data => {
        done();
      })
      .catch(error => {
        done(new Error(error.message));
      });
  });
});

describe('Enroll user', () => {
  it.skip('It should return newly enrolled user', done => {
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
        done(new Error(error.message));
      });
  });
});
