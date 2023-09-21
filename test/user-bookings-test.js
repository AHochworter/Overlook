import chai from 'chai';
const expect = chai.expect;
import customerData from '../sample-data/sample-customer';
import bookingsData from '../sample-data/sample-bookings';
import roomData from '../sample-data/sample-rooms';
import { getRandomGuest, filterBookingsByGuest } from '../src/user-bookings';

describe('bookings', function () {
  let currentGuest = { id: 1, name: 'Amelia Thompson' };

  it('filterBookingsByGuest should be a function', () => {
    expect(filterBookingsByGuest).to.be.a('function');
  });

  it('should filter bookings based on the current guest', () => {
    const guestBookings = filterBookingsByGuest(currentGuest, bookingsData);

    expect(guestBookings).to.deep.equal([
      {
        id: 'Sample_5fwrgu4i7k55hl6sz',
        userID: 1,
        date: '1/8/23',
        roomNumber: 8,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6t5',
        userID: 1,
        date: '1/10/23',
        roomNumber: 12,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6t6',
        userID: 1,
        date: '1/25/23',
        roomNumber: 2,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6t7',
        userID: 1,
        date: '1/26/23',
        roomNumber: 20,
      },
    ]);
  });
});
