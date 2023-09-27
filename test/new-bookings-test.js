import chai from 'chai';
const expect = chai.expect;

import roomData from '../sample-data/sample-rooms';
import {
  allUpcomingBookings,
  allAvailableRooms,
  findSelectedRoom,
} from '../src/new-bookings';
import bookingsData from '../sample-data/sample-bookings';

describe('determine availability', function () {
  it('allUpcomingBookings should be a function', () => {
    expect(allUpcomingBookings).to.be.a('function');
  });

  it('should give a list of all the upcoming bookings', () => {
    // Generate a dynamic current date by adding some days to the current date.
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); // Add 1 day to the current date.

    const upcomingBookings = allUpcomingBookings(bookingsData, currentDate);

    expect(upcomingBookings).to.deep.equal([
      {
        id: 'Sample_5fwrgu4i7k55hl6te',
        userID: 2,
        date: '11/27/23',
        roomNumber: 20,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6tf',
        userID: 2,
        date: '11/28/23',
        roomNumber: 22,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6ti',
        userID: 4,
        date: '11/23/23',
        roomNumber: 22,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6tj',
        userID: 4,
        date: '11/24/23',
        roomNumber: 7,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6to',
        userID: 5,
        date: '12/14/23',
        roomNumber: 14,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6tp',
        userID: 5,
        date: '12/15/23',
        roomNumber: 8,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6tx',
        userID: 6,
        date: '12/14/23',
        roomNumber: 19,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6u3',
        userID: 8,
        date: '12/14/23',
        roomNumber: 12,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6u8',
        userID: 10,
        date: '11/30/23',
        roomNumber: 13,
      },
      {
        id: 'Sample_5fwrgu4i7k55hl6u9',
        userID: 10,
        date: '12/1/23',
        roomNumber: 15,
      },
    ]);
  });

  it('allAvailableRooms should be a function', () => {
    expect(allAvailableRooms).to.be.a('function');
  });

  it('should return an array of available rooms based on current date', () => {
    let currentDate = '12/14/2023';
    const checkAvailability = allAvailableRooms(
      roomData,
      bookingsData,
      currentDate
    );

    expect(checkAvailability).to.deep.equal([
      {
        number: 1,
        roomType: 'residential suite',
        bidet: 'true',
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 1268.8,
      },
      {
        number: 2,
        roomType: 'suite',
        bidet: 'false',
        bedSize: 'Full',
        numBeds: 2,
        costPerNight: 1358.04,
      },
      {
        number: 3,
        roomType: 'single room',
        bidet: 'false',
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 1368.36,
      },
      {
        number: 4,
        roomType: 'single room',
        bidet: 'false',
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 1322.08,
      },
      {
        number: 5,
        roomType: 'single room',
        bidet: 'true',
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 1255.13,
      },
      {
        number: 6,
        roomType: 'junior Suite',
        bidet: 'true',
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 1297.77,
      },
      {
        number: 7,
        roomType: 'single room',
        bidet: 'false',
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 1173.6,
      },
      {
        number: 8,
        roomType: 'junior Suite',
        bidet: 'false',
        bedSize: 'king',
        numBeds: 1,
        costPerNight: 1195.95,
      },
      {
        number: 9,
        roomType: 'single room',
        bidet: 'true',
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 1150.29,
      },
      {
        number: 10,
        roomType: 'suite',
        bidet: 'false',
        bedSize: 'Twin',
        numBeds: 1,
        costPerNight: 1373.23,
      },
      {
        number: 11,
        roomType: 'single room',
        bidet: 'true',
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 1155.43,
      },
      {
        number: 13,
        roomType: 'single room',
        bidet: 'false',
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 1317.94,
      },
      {
        number: 15,
        roomType: 'residential suite',
        bidet: 'false',
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 1220.92,
      },
      {
        number: 16,
        roomType: 'single room',
        bidet: 'false',
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 1244.2,
      },
      {
        number: 17,
        roomType: 'junior Suite',
        bidet: 'false',
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 1246.11,
      },
      {
        number: 18,
        roomType: 'junior suite',
        bidet: 'false',
        bedSize: 'king',
        numBeds: 2,
        costPerNight: 1372.31,
      },
      {
        number: 20,
        roomType: 'residential suite',
        bidet: 'false',
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 1257.96,
      },
      {
        number: 21,
        roomType: 'single room',
        bidet: 'false',
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 1321.99,
      },
      {
        number: 22,
        roomType: 'single room',
        bidet: 'false',
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 1262.73,
      },
      {
        number: 23,
        roomType: 'residential suite',
        bidet: 'false',
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 1132.27,
      },
      {
        number: 24,
        roomType: 'suite',
        bidet: 'false',
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 1245.43,
      },
      {
        number: 25,
        roomType: 'single room',
        bidet: 'true',
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 1229.39,
      },
    ]);
  });

  it('findSelectedRoom should be a function', () => {
    expect(findSelectedRoom).to.be.a('function');
  });
});
