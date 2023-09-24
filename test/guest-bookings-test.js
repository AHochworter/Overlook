import chai from 'chai';
const expect = chai.expect;
// import customerData from '../sample-data/sample-customer';
import bookingsData from '../sample-data/sample-bookings';
import roomData from '../sample-data/sample-rooms';
import {
  getRandomGuest,
  filterBookingsByGuest,
  bookingsByRoomByGuest,
  guestPastBookings,
  guestComingBookings,
  guestTotalSpent,
} from '../src/guest-bookings';

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
  it('bookingsByRoomByGuest should be a function', () => {
    expect(bookingsByRoomByGuest).to.be.a('function');
  });

  it('should return rooms booked by a specific guest', () => {
    let currentGuest = { id: 1, name: 'Amelia Thompson' };

    const bookingsAmelia = bookingsByRoomByGuest(
      currentGuest,
      bookingsData,
      roomData
    );

    expect(bookingsAmelia).to.deep.equal([
      {
        room: {
          number: 8,
          roomType: 'junior Suite',
          bidet: 'false',
          bedSize: 'king',
          numBeds: 1,
          costPerNight: 1195.95,
        },
        date: '1/8/23',
      },
      {
        room: {
          number: 12,
          roomType: 'single room',
          bidet: 'false',
          bedSize: 'twin',
          numBeds: 2,
          costPerNight: 1129.07,
        },
        date: '1/10/23',
      },
      {
        room: {
          number: 2,
          roomType: 'suite',
          bidet: 'false',
          bedSize: 'Full',
          numBeds: 2,
          costPerNight: 1358.04,
        },
        date: '1/25/23',
      },
      {
        room: {
          number: 20,
          roomType: 'residential suite',
          bidet: 'false',
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 1257.96,
        },
        date: '1/26/23',
      },
    ]);
  });

  it('guestPastBookings should be a function', () => {
    expect(guestPastBookings).to.be.a('function');
  });
  it('should return past bookings for a specific guest', () => {
    const currentGuest = { id: 1, name: 'Amelia Thompson' };
    const pastBookings = guestPastBookings(
      currentGuest,
      bookingsData,
      roomData
    );
    //How do I set the 'expect' results for this test??
  });
  it('guestComingBookings should be a function', () => {
    expect(guestComingBookings).to.be.a('function');
  });

  it('guestTotalSpent should be a function', () => {
    expect(guestTotalSpent).to.be.a('function');
  });

  it('should calculate the total spent on past stays', () => {
    const currentGuest = { id: 1, name: 'Amelia Thompson' };
    const pastBookings = guestPastBookings(
      currentGuest,
      bookingsData,
      roomData
    );
    const totalSpent = guestTotalSpent(currentGuest, bookingsData, roomData);

    expect(totalSpent).to.equal(4941.02);
  });
});
