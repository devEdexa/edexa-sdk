import { Bstamp } from '../../src/';

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { DEFAULT_NETWORK } from '../../src/util/constant';
import { createHash, randomBytes } from 'crypto';
chai.use(chaiHttp);

const authSettings = {
  headers: {
    'client-id': 'b1451bc9-4d8a-4e51-838c-c2341a1c13c3',
    'secret-key':
      'F7D866D57ACA8071817D28A49C81CDDEE74899492B11C2FE3FE9818368956DC91150C138AC46770B273FE8E7665C2D41DE1A11A728D318CB86BC4627C72FA58A',
  },
};

let token;
describe('Authenticate user', () => {
  it('1. Authenticate user', done => {
    const settings = { network: DEFAULT_NETWORK };

    const bStamp = new Bstamp(settings);
    bStamp
      .authenticate(authSettings)
      .then(data => {
        expect(data).to.be.an('object').with.all.keys('id', 'name', 'token', 'username');
        token = data.token;
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});

describe('Add stamp', () => {
  it('1. Add stamp', done => {
    const settings = { network: DEFAULT_NETWORK };

    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: true,
    };
    bStamp
      .addStamp(data)
      .then(data => {
        console.log(data);
        done();
      })
      .catch(error => {
        console.error('Authentication error:', error);
        done(new Error(error.message));
      });
  });
});

describe('Get stamp', () => {
  it('1. Get stamp', done => {
    const settings = { network: DEFAULT_NETWORK };

    const bStamp = new Bstamp({
      ...settings,
      authorization: `Bearer ${token}`,
    });

    const data = {
      hash: Buffer.from(createHash('sha256').update(randomBytes(48).toString('hex')).digest('hex')).toString('base64'),
      isPrivate: true,
    };
    bStamp
      .getAllStamp(data)
      .then(data => {
        console.log(data);
        done();
      })
      .catch(error => {
        console.error('Authentication error:', error);
        done(new Error(error.message));
      });
  });
});
