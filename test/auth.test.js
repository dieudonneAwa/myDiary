import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/app';
import { data } from './data/users';

chai.use(chaiHttp);

describe('Sign Up', () => {
  const { user1, user2 } = data;
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
  it('should not signup if email is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(user2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.status).eql('error');
        expect(res.body.error).to.be.a('string');
        done();
      });
  });
});
