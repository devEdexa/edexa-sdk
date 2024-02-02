import { expect } from 'chai';
import { DEFAULT_NETWORK } from '../../src/util/constant';
import { Barchive } from '../../src';
import { Ibarchive, UpdateFileExpireTime } from '../../src/util/interface/IBarchive';
import path from 'path';
import dotenv from 'dotenv';
import { GetDetailsByIdDTO } from '../../src/util/interface/ICommon';
const envFound = dotenv.config();

const settings = { network: DEFAULT_NETWORK };
let token;
let fileId;
const invalidAuthToken = process.env.INVALID_AUTH_TOKEN;
const invalidFileId = '00000657f9275197e4c00000';

describe('Authenticate user', function () {
  it('It should returns information about user', function (done) {
    const authSettings = {
      clientId: process.env.BARCHIVE_CLIENT_ID,
      secretKey: process.env.BARCHIVE_SECRET_KEY,
    };
    const barchive = new Barchive(settings);
    barchive
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

  it('It should returns invalid user or user not found', function (done) {
    const authSettings = {
      clientId: process.env.INVALID_CLIENT_ID,
      secretKey: process.env.INVALID_SECRET_KEY,
    };

    const barchive = new Barchive(settings);
    barchive
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

    const bArchiveData = new Barchive(settings);
    bArchiveData
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
      clientId: process.env.BARCHIVE_CLIENT_ID,
      secretKey: '',
    };

    const bArchiveData = new Barchive(settings);
    bArchiveData
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
      secretKey: process.env.BARCHIVE_SECRET_KEY,
    };

    const bArchiveData = new Barchive(settings);
    bArchiveData
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

describe('File upload or Add File', function () {
  const data: Ibarchive = {
    lat: '32.12',
    long: '78.51',
    expireTimeInMinutes: '0.01',
    description: 'test',
    attachments: path.join(__dirname, './index.ts'),
  };

  it('It should return Authorization token not found', done => {
    const bArchiveData = new Barchive({
      ...settings,
    });
    //{ status: 400, message: 'Authorization token not found' }
    bArchiveData
      .addFile(data)
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

  it('It should return invalid auth token', done => {
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });
    //{ status: 401, message: 'Invalid auth token' }
    bArchiveData
      .addFile(data)
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

  //field missing
  it('It should return lat is required', done => {
    const passMissingfield = {
      long: '72.12',
      expireTimeInMinutes: '0.01',
      description: 'test',
      attachments: path.join(__dirname, './index.ts'), // 'http://placehold.it/120x120&text=image1',
    };

    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    //{ status: 400, message: 'lat is required' }
    bArchiveData
      .addFile(passMissingfield)
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

  // pass empty filed
  it('It should return lat is not allowed to be empty', done => {
    const passEmptydata = {
      lat: '',
      long: '78.51',
      expireTimeInMinutes: '0.01',
      description: 'test',
      attachments: path.join(__dirname, './index.ts'),
    };

    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    //{ status: 400, message: 'lat is not allowed to be empty' }
    bArchiveData
      .addFile(passEmptydata)
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

  //file not attached
  it('It should return attachments is required', done => {
    const passEmptydata: any = {
      lat: '32.12',
      long: '78.51',
      expireTimeInMinutes: '0.01',
      description: 'test',
    };

    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    //{ status: 400, message: 'Invalid request' }
    bArchiveData
      .addFile(passEmptydata)
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
  it('It should return File added successfully', done => {
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    bArchiveData
      .addFile(data)
      .then(data => {
        fileId = data[0]?.id;
        expect(data);
        expect(data).to.be.an('array');
        expect(data[0].file).to.be.an('array');
        expect(data[0].file[0].fileName).to.be.an('string');
        expect(data[0].file[0].fileType).to.be.an('string');
        expect(data[0].file[0].mimeType).to.be.an('string');
        expect(data[0].file[0].fileSize).to.be.an('number');
        expect(data[0].file[0].url).to.be.an('string');
        expect(data[0].file[0]._id).to.be.an('string');
        expect(data[0].userId).to.be.an('string');
        expect(data[0].fileName).to.be.an('string');
        expect(data[0].description).to.be.an('string');
        expect(data[0].lat).to.be.an('string');
        expect(data[0].long).to.be.an('string');
        expect(data[0].transactionId).to.be.an('string');
        expect(data[0].uniqueId).to.be.an('string');
        expect(data[0].expireTime).to.be.an('number');
        expect(data[0].expireTimeStamp).to.be.an('string');
        expect(data[0].id).to.be.an('string');
        expect(data[0].createdAt).to.be.an('string');
        expect(data[0].updatedAt).to.be.an('string');
        done();
      })
      .catch(error => {
        done();
      });
  });
});

describe('File Update', function () {
  it('It should return Authorization token not found', done => {
    const updateFileData: UpdateFileExpireTime = { id: fileId, expireTimeInMinutes: '0.001' };
    const bArchiveData = new Barchive({
      ...settings,
    });
    bArchiveData
      .updateFile(updateFileData)
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
  it('It should return invalid auth token', done => {
    const updateFileData: UpdateFileExpireTime = { id: fileId, expireTimeInMinutes: '0.001' };
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });
    //{ status: 401, message: 'Invalid auth token' }
    bArchiveData
      .updateFile(updateFileData)
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
  it('It should return id is required', done => {
    const updateFileData: { expireTimeInMinutes: string } = { expireTimeInMinutes: '0.001' };
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    // { status: 400, message: 'id is required' }
    bArchiveData
      .updateFile(updateFileData)
      .then((data: any) => {
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });

  it('It should return expireTimeInMinutes is not allowed to be empty', done => {
    const updateFileData: UpdateFileExpireTime = { id: fileId, expireTimeInMinutes: '' };
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    // { status: 400, message: 'expireTimeInMinutes is not allowed to be empty' }
    bArchiveData
      .updateFile(updateFileData)
      .then((data: any) => {
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });

  it('It should return expireTimeInMinutes must be a string', done => {
    const updateFileData: UpdateFileExpireTime = { id: invalidFileId, expireTimeInMinutes: 2 };
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    // { status: 400, message: 'expireTimeInMinutes is not allowed to be empty' }
    bArchiveData
      .updateFile(updateFileData)
      .then((data: any) => {
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });

  it('It should return File updated successfully', done => {
    const updateFileData: UpdateFileExpireTime = { id: fileId, expireTimeInMinutes: '0.001' };
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    //{ status: 200, message: 'File get successfully' }
    bArchiveData
      .updateFile(updateFileData)
      .then((data: any) => {
        expect(data);
        expect(data).to.be.an('object').with.all.keys('status', 'message');
        expect(data.status).to.be.an('number');
        expect(data.message).to.be.an('string');
        done();
      })
      .catch(error => {
        done();
      });
  });
});

/*********************** get File and dlete file ***********************/
describe('Get File details', function () {
  it('It should return Authorization token not found', done => {
    const fileIdData: GetDetailsByIdDTO = { id: fileId };
    const bArchiveData = new Barchive({
      ...settings,
    });
    bArchiveData
      .getFile(fileIdData)
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
  it('It should return invalid auth token', done => {
    const fileIdData: GetDetailsByIdDTO = { id: fileId };
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });
    //{ status: 401, message: 'Invalid auth token' }
    bArchiveData
      .getFile(fileIdData)
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
  it('It should return id is required', done => {
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    // { status: 400, message: 'id is required' }
    bArchiveData
      .getFile('')
      .then((data: any) => {
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });

  it('It should return File get successfully', done => {
    const fileIdData: GetDetailsByIdDTO = { id: fileId };
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    //{ status: 200, message: 'File get successfully' }
    setTimeout(() => {
      bArchiveData
        .getFile(fileIdData)
        .then((data: any) => {
          expect(data);
          expect(data).to.be.an('array');
          expect(data[0].file).to.be.an('string');
          expect(data[0].fileName).to.be.an('string');
          expect(data[0].fileSize).to.be.an('number');
          expect(data[0].mimeType).to.be.an('string');
          done();
        })
        .catch(error => {
          done();
        });
    }, 1500);
  });
});

describe('Delete File', function () {
  it('It should return Authorization token not found', done => {
    const data: GetDetailsByIdDTO = { id: fileId };
    const bArchiveData = new Barchive({
      ...settings,
    });
    bArchiveData
      .deleteFile(data)
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
  it('It should return invalid auth token', done => {
    const data: GetDetailsByIdDTO = { id: fileId };
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${invalidAuthToken}`,
    });
    //{ status: 401, message: 'Invalid auth token' }
    bArchiveData
      .deleteFile(data)
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
  it('It should return id is required', done => {
    const data: GetDetailsByIdDTO = { id: fileId };
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    // { status: 400, message: 'id is required' }
    bArchiveData
      .deleteFile('')
      .then((data: any) => {
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });

  it('It should return File not found', done => {
    const wrondFileId: GetDetailsByIdDTO = { id: invalidFileId };
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    // { status: 400, message: 'File not found' }
    bArchiveData
      .deleteFile(wrondFileId)
      .then((data: any) => {
        done();
      })
      .catch(error => {
        expect(error).to.be.an('object');
        expect(error.status).to.be.an('number');
        expect(error.message).to.be.an('string');
        done();
      });
  });

  it('It should return File deleted successfully', done => {
    const data: GetDetailsByIdDTO = { id: fileId };
    const bArchiveData = new Barchive({
      ...settings,
      authorization: `Bearer ${token}`,
    });
    //{ status: 200, message: 'File deleted successfully.' }
    bArchiveData
      .deleteFile(data)
      .then((data: any) => {
        expect(data).to.be.an('object').with.all.keys('status', 'message');
        expect(data.status).to.be.an('number');
        expect(data.message).to.be.an('string');
        done();
      })
      .catch(error => {
        done();
      });
  });
});
