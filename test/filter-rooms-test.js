import chai from 'chai';
const expect = chai.expect;

import roomData from '../sample-data/sample-rooms';
import { filterRoomsByType } from '../src/filter-rooms';

describe('filter rooms', function () {
  it('filterRoomsByType should be a function', () => {
    expect(filterRoomsByType).to.be.a('function');
  });

  it('should filter rooms by room type', () => {
    const singleRooms = filterRoomsByType(roomData, 'single room');

    expect(singleRooms).to.deep.equal([
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
        number: 7,
        roomType: 'single room',
        bidet: 'false',
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 1173.6,
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
        number: 11,
        roomType: 'single room',
        bidet: 'true',
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 1155.43,
      },
      {
        number: 12,
        roomType: 'single room',
        bidet: 'false',
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 1129.07,
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
        number: 16,
        roomType: 'single room',
        bidet: 'false',
        bedSize: 'full',
        numBeds: 2,
        costPerNight: 1244.2,
      },
      {
        number: 19,
        roomType: 'single room',
        bidet: 'false',
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 1281,
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
        number: 25,
        roomType: 'single room',
        bidet: 'true',
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 1229.39,
      },
    ]);
  });
});
