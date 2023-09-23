import chai from 'chai';
const expect = chai.expect;
import customers from '../sample-data/sample-customer';
import { findGuest, verifyLogin } from '../src/login';

describe('login and password', function () {
  it('findGuest should be a function', () => {
    expect(findGuest).to.be.a('function');
  });

  it('should return a valid customer if credentials match', () => {
    const guestCredentials = findGuest('customer1', 'overlook21', customers);

    // Check if the result is not undefined
    expect(guestCredentials).to.exist;

    // Check individual properties of the returned object
    expect(guestCredentials.name).to.equal('Amelia Thompson');
    expect(guestCredentials.id).to.equal(1);
  });
});
