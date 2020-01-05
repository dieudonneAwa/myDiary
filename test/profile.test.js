/* eslint-disable no-unused-vars */
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/app';
import { data } from './data/users';

chai.use(chaiHttp);

const { user1, user3 } = data;
let token;
describe('Profile', () => {
  before('Seed data', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(user3)
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });
  it('should fetch a user profile by email', (done) => {
    chai.request(app)
      .get(`/api/v1/users/${user3.email}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body.status).eql('success');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('profile');
        done();
      });
  });
  it('should fail to fetch a user profile by email if user does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/users/usernotexist@gmail.com')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body.status).eql('error');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).eql('User with email not found');
        done();
      });
  });
});
