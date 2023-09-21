import chai from 'chai';
const expect = chai.expect;
import customers from '../sample-data/sample-customer';
import bookings from '../sample-data/sample-bookings';
import rooms from '../sample-data/sample-rooms';
import {
  guestLogin,
  verifyLoginInfo,
  matchGuest,
  validatePassword,
  getGuestId,
} from '../src/login';

describe('login and password', function () {
  it('guestLogin should be a function', () => {
    expect(guestLogin).to.be.a('function');
  });

  it('verifyLoginInfo should be a function', () => {
    expect(verifyLoginInfo).to.be.a('function');
  });

  it('matchGuest should be a function', () => {
    expect(matchGuest).to.be.a('function');
  });

  it('validatePassword should be a function', () => {
    expect(validatePassword).to.be.a('function');
  });

  it('getGuestId should be a function', () => {
    expect(getGuestId).to.be.a('function');
  });
});
