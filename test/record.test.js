/* eslint-disable no-unused-vars */
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/app';
import { diaryData } from './data/diary';
import { data } from './data/users';
import { recordData } from './data/records';

chai.use(chaiHttp);

const { diary1, diary2 } = diaryData;
describe('Records', () => {
  let token;
  before('SignIn', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_in')
      .send(data.user1)
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });
  it('should create a record on a diary', (done) => {
    chai.request(app)
      .post(`/api/v1/diaries/${diary1.id}/records`)
      .set('Authorization', `Bearer ${token}`)
      .send(recordData.record1)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status').eql('success');
        expect(res.body.data).to.have.property('record');
        done();
      });
  });
});
