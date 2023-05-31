import { Bstamp } from '../../src';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { API_VERSION, DEFAULT_NETWORK } from '../../src/util/constant';
import { createHash, randomBytes } from 'crypto';
import { faker } from '@faker-js/faker';
import { AddStampRequestDTO, EnrollUserDTO, GetStampDetailsDTO } from '../../src/util/interface';

chai.use(chaiHttp);

const settings = { network: DEFAULT_NETWORK };

let token;
let stampId;
let userId;
const invalidAuthToken = 123;
const alreadyEnrolledUserId = 'b2ace90e-d042-4d68-a81c-5b07f0bc5551';
describe('Authenticate user', function () {
  it('It should returns information about user', function (done) {
    const authSettings = {
      headers: {
        'client-id': 'b1451bc9-4d8a-4e51-838c-c2341a1c13c3',
        'secret-key':
          'F7D866D57ACA8071817D28A49C81CDDEE74899492B11C2FE3FE9818368956DC91150C138AC46770B273FE8E7665C2D41DE1A11A728D318CB86BC4627C72FA58A',
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

  it.skip('It should return user not found', function (done) {
    const authSettings = {
      headers: {
        'client-id': 'b1451bc9-4d8a-4e51-838c-c2341a1c13c2',
        'secret-key':
          'F7D866D57ACA8071817D28A49C81CDDEE74899492B11C2FE3FE9818368956DC91150C138AC46770B273FE8E7665C2D41DE1A11A728D318CB86BC4627C72FA58A',
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

  it.skip('It should return something went wrong', function (done) {
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

describe('Enroll user', () => {
  it.skip('It should return Authorization token not found', done => {
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
  it.skip('It should return invalid auth token', done => {
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
        userId = data.data.userId;
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('Add stamp', () => {
  it.skip('It should return Authorization token not found', done => {
    const bStamp = new Bstamp({
      ...settings,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: false,
    };
    bStamp
      .addStamp(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
  it.skip('It should return invalid auth token', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: false,
    };
    bStamp
      .addStamp(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
  it.skip('It should return stamped already exist', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: false,
    };
    bStamp
      .addStamp(data, { version: API_VERSION.VERSION_2 })
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
      userId: userId,
      type: '0',
    };
    bStamp
      .addStamp(data, { version: API_VERSION.VERSION_2 })
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
  it.skip('It should return something went wrong', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: false,
    };
    bStamp
      .addStamp(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        expect(data);
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe.skip('Get stamp List', () => {
  it('It should return Authorization token not found', done => {
    const bStamp = new Bstamp({
      ...settings,
    });

    const data: AddStampRequestDTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: true,
    };
    bStamp
      .getAllStamp(data, { version: API_VERSION.VERSION_2 })
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
      isPrivate: true,
    };
    bStamp
      .getAllStamp(data, { version: API_VERSION.VERSION_2 })
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

    const data: any = { userId: userId };
    bStamp
      .getAllStamp(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('count', 'stamps');
        expect(data.count).to.be.an('number');
        expect(data.stamps).to.be.an('array');
        data.stamps.every(stamps =>
          expect(stamps).to.have.all.keys('_id', 'userId', 'clientId', 'name', 'txId', 'code', 'isEsign', 'createdAt')
        );

        data.stamps.forEach(stamp => {
          expect(stamp._id).to.be.an('string');
          expect(stamp.userId).to.be.an('string');
          expect(stamp.clientId).to.be.an('string');
          expect(stamp.name).to.be.an('string');
          expect(stamp.txId).to.be.an('string');
          expect(stamp.code).to.be.an('string');
          expect(stamp.isEsign).to.be.an('boolean');
          expect(stamp.createdAt).to.be.an('string');
        });
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('Get stamp Detail', () => {
  it.skip('It should return Authorization token not found', done => {
    const bStamp = new Bstamp({
      ...settings,
    });

    const data: GetStampDetailsDTO = { id: stampId };
    bStamp
      .getStampDetail(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it.skip('It should return invalid auth token', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });

    const data: GetStampDetailsDTO = { id: stampId };
    bStamp
      .getStampDetail(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it.skip('It should return stamped file not found', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: GetStampDetailsDTO = { id: '123', userId: userId };
    bStamp
      .getStampDetail(data, { version: API_VERSION.VERSION_2 })
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
    const data: GetStampDetailsDTO = { id: stampId, userId: userId };
    bStamp
      .getStampDetail(data, { version: API_VERSION.VERSION_2 })
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
