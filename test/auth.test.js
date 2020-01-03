import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/app';

chai.use(chaiHttp);

const data = {
  user1: {
    id: 1,
    name: 'user1 name',
    email: 'user1@e.com',
    password: 'password',
  },
};

describe('Sign Up', () => {
  const { user1 } = data;
  it('should register a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(user1)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
});
