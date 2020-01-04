/* eslint-disable no-unused-vars */
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/app';
import { diaryData } from './data/diary';
import { data } from './data/users';
import { createToken } from '../api/modules/jwt';

chai.use(chaiHttp);

const { diary1, diary2 } = diaryData;
describe('Diary', () => {
  let token;
  before('Seed data', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_in')
      .send(data.user1)
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });
  it('should create a diary', (done) => {
    chai.request(app)
      .post('/api/v1/diaries')
      .set('Authorization', `Bearer ${token}`)
      .send(diary1)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.status).eql('success');
        expect(res.body.data).to.be.an('object');
        done();
      });
  });
  it('should fail create a diary is name is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/diaries')
      .set('Authorization', `Bearer ${token}`)
      .send(diary2)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.status).eql('error');
        done();
      });
  });
  it('should fail to create a diary if user is not logged in', (done) => {
    chai.request(app)
      .post('/api/v1/diaries')
      .send(diary1)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
        expect(res.body.status).eql('error');
        expect(res.body.error).eql('Unauthorized');
        done();
      });
  });
  it('should fail create a diary if logged in user is not in the db', (done) => {
    const wrongToken = createToken({ id: 1, email: 'qwerty@gmail.com' });
    chai.request(app)
      .post('/api/v1/diaries')
      .set('Authorization', `Bearer ${wrongToken}`)
      .send(diary1)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('error');
        expect(res.body.status).eql('error');
        expect(res.body.error).eql('Forbidden');
        done();
      });
  });
});
