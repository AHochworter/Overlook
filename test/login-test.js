import chai from 'chai';
const expect = chai.expect;
import customerData from '../sample-data/sample-customer';
import { findGuest } from '../src/login';

describe('login and password', function () {
  it('findGuest should be a function', () => {
    expect(findGuest).to.be.a('function');
  });

  it('should return a valid customer if credentials match', () => {
    const guestCredentials = findGuest('customer1', 'overlook21', customerData);

    expect(guestCredentials).to.exist;

    expect(guestCredentials.name).to.equal('Amelia Thompson');
    expect(guestCredentials.id).to.equal(1);
  });
});
