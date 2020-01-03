import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/app';

chai.use(chaiHttp);

describe('Home', () => {
  it('should show a welcome message', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.message).eql('Welcome to my Diary API');
        done();
      });
  });
});
