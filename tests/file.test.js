const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('File API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should upload a file', async () => {
    const res = await request(app)
      .post('/api/upload')
      .set('x-api-key', process.env.API_KEY)
      .attach('file', 'test.pdf');
    expect(res.status).toBe(201);
    expect(res.body.fileId).toBeDefined();
  });
});