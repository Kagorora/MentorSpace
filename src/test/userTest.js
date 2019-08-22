/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-undef
describe('User tests', () => {
  // ========================================== SIGNUP ==========================
  // eslint-disable-next-line no-undef
  it('should be able to signup', (done) => {
    const user = {
      id: 1,
      firstName: 'ruhimbaza',
      lastName: 'Bertin',
      email: 'ndanda@gmail.com',
      password: 'bertin123',
      address: 'kigali',
      bio: 'scientist',
      occupation: 'software development',
      expertise: 'sostware architecture',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.should.be.an('object');
      });
    done();
  });
  it('should not be able to signup for duplicate', (done) => {
    const user = {
      id: 1,
      firstName: 'ruhimbaza',
      lastName: 'Bertin',
      email: 'ruhimbazab@gmail.com',
      password: 'bertin123',
      address: 'kigali',
      bio: 'scientist',
      occupation: 'software development',
      expertise: 'sostware architecture',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
      });
    done();
  });
  it('should not be able to signup for missing information', (done) => {
    const user = {
      lastName: 'Bertin',
      email: 'tkyz@gmail.com',
      password: 'bertin123',
      address: 'kigali',
      bio: 'scientist',
      occupation: 'software development',
      expertise: 'sostware architecture',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
});
