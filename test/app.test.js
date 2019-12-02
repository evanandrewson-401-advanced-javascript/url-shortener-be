require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(() => {
    return mongoose.connection.close();
  });
  
  it('can sign up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'test' })
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'test'
        });
      });
  });
  it('can log in a user', async() => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'test' });
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'test', password: 'test' })
      .expect(200);
      
    expect(res.body).toEqual({
      _id: expect.any(String),
      username: 'test'
    });
  });
  it('can verify a user', async() => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'test', password: 'test' });
    const res = await request(app)
      .get('/api/v1/auth/verify')
      .expect(200);

    expect(res).toEqual({
      _id: expect.any(String),
      username: 'test'
    });  
  });
});