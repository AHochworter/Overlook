import chai from 'chai';
const expect = chai.expect;
import customerData from '../sample-data/sample-customer';
import { findGuest, verifyLogin } from '../src/login';

describe('login and password', function () {
  it('findGuest should be a function', () => {
    expect(findGuest).to.be.a('function');
  });

  it('should return a valid customer if credentials match', () => {
    const guestCredentials = findGuest('customer1', 'overlook21', customerData);

    // Check if the result is not undefined
    expect(guestCredentials).to.exist;

    // Check individual properties of the returned object
    expect(guestCredentials.name).to.equal('Amelia Thompson');
    expect(guestCredentials.id).to.equal(1);
  });

  it('verifyLogin should be a function', () => {
    expect(verifyLogin).to.be.a('function');
  });

  it('should check and verify the login credientials', () => {
    const guestCredentials = findGuest('customer1', 'overlook21', customerData);
    expect(guestCredentials).to.deep.equal({ id: 1, name: 'Amelia Thompson' });
  });
});
