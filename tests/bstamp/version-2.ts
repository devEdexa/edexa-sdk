import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { createHash, randomBytes } from 'crypto';
import { faker } from '@faker-js/faker';

import { Bstamp } from '../../src';
import { API_VERSION, DEFAULT_NETWORK } from '../../src/util/constant';
import {
  AddStampRequestDTO,
  AddStampRequestV2DTO,
  CreateWebhookDTO,
  EnrollUserDTO,
  GetStampDetailsV2DTO,
} from '../../src/util/interface';
import config from '../../src/config';

chai.use(chaiHttp);

const settings = { network: DEFAULT_NETWORK };

let token;
let stampId;
let userId;
const invalidAuthToken = config.INVALID_AUTH_TOKEN;
const alreadyEnrolledUserId = 'b2ace90e-d042-4d68-a81c-5b07f0bc5551';
const invalidStampId = 'abc123';

describe('Authenticate user', function () {
  it('It should returns information about user', function (done) {
    const authSettings = {
      headers: {
        'client-id': config.CLIENT_ID,
        'secret-key': config.SECRET_KEY,
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
        'client-id': config.CLIENT_ID,
        'secret-key': config.SECRET_KEY,
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
        userId = data.data.userId;
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

    const data: AddStampRequestV2DTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      userId: userId,
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
  it('It should return invalid auth token', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });

    const data: AddStampRequestV2DTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      userId: userId,
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
  it('It should return stamped already exist', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: AddStampRequestV2DTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      userId: userId,
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
    const data: AddStampRequestV2DTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      userId: userId,
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
  it('It should return something went wrong', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data: AddStampRequestV2DTO = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      userId: userId,
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

describe('Get stamp List', () => {
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
  it('It should return Authorization token not found', done => {
    const bStamp = new Bstamp({
      ...settings,
    });

    const data: GetStampDetailsV2DTO = { id: stampId, userId: userId };
    bStamp
      .getStampDetail(data, { version: API_VERSION.VERSION_2 })
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

    const data: GetStampDetailsV2DTO = { id: stampId, userId: userId };
    bStamp
      .getStampDetail(data, { version: API_VERSION.VERSION_2 })
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

    const data: GetStampDetailsV2DTO = { id: invalidStampId, userId: userId };
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
    const data: GetStampDetailsV2DTO = { id: stampId, userId: userId };
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

describe('Create Webhook', () => {
  it('It should return Authorization token not found', done => {
    const bStamp = new Bstamp({
      ...settings,
    });

    const data: CreateWebhookDTO = {
      redirectUrl: 'https://edexa.network/',
      description: 'For bstamp file which have short code as b7ab41',
      action: ['64799d3c4bfb861eee61aca6', '64799d3c4bfb861eee61aca7'],
    };
    bStamp
      .createWebhook(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return invald authorization token', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });

    const data: CreateWebhookDTO = {
      redirectUrl: 'https://edexa.network/',
      description: 'For bstamp file which have short code as b7ab41',
      action: ['64799d3c4bfb861eee61aca6', '64799d3c4bfb861eee61aca7'],
    };
    bStamp
      .createWebhook(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return Redirect URL can not be empty', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    const data: CreateWebhookDTO = {
      redirectUrl: '',
      description: 'For bstamp file which have short code as ******',
      action: ['hash.failed', 'hash.succeed'],
    };
    bStamp
      .createWebhook(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return Description can not be empty', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    const data: CreateWebhookDTO = {
      redirectUrl: 'https://edexa.network/',
      description: '',
      action: ['hash.failed', 'hash.succeed'],
    };
    bStamp
      .createWebhook(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return ActionID can not be empty', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    const data: CreateWebhookDTO = {
      redirectUrl: 'https://edexa.network/',
      description: 'For bstamp file which have short code as ******',
      action: [],
    };
    bStamp
      .createWebhook(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return create webhook', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    const data: CreateWebhookDTO = {
      redirectUrl: 'https://edexa.network/',
      description: 'For bstamp file which have short code as ******',
      action: ['hash.failed', 'hash.succeed'],
    };
    bStamp
      .createWebhook(data, { version: API_VERSION.VERSION_2 })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('status', 'message', 'data');
        expect(data.data).to.be.an('object');
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('Get Webhook Information', () => {
  it('It should return Authorization token not found', done => {
    const bStamp = new Bstamp({
      ...settings,
    });

    bStamp
      .getWebhook({ version: API_VERSION.VERSION_2 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return Authorization token not found', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });
    bStamp
      .getWebhook({ version: API_VERSION.VERSION_2 })
      .then(data => {
        done();
      })
      .catch(error => {
        done();
      });
  });
  it('It should return details of webhooks', done => {
    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    bStamp
      .getWebhook({ version: API_VERSION.VERSION_2 })
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('status', 'message', 'data');
        expect(data.data)
          .to.be.an('array')
          .with.all.keys('_id', 'action', 'userId', 'redirectUrl', 'description', 'status', 'createdAt', 'updatedAt');
        data.data.forEach(webhook => {
          expect(webhook._id).to.be.an('string');
          expect(webhook.action).to.be.an('array').to.include('string');
          expect(webhook.userId).to.be.an('string');
          expect(webhook.redirectUrl).to.be.an('string');
          expect(webhook.description).to.be.an('string');
          expect(webhook.status).to.be.an('number');
          expect(webhook.createdAt).to.be.an('string');
          expect(webhook.updatedAt).to.be.an('string');
        });
        done();
      })
      .catch(error => {
        done();
      });
  });
});
