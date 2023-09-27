const allUpcomingBookings = (allBookings, currentDate) => {
  const upcomingBookings = allBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate >= currentDate;
  });
  return upcomingBookings;
};

const allAvailableRooms = (allRooms, allBookings, currentDate) => {
  const bookedRoomsOnDate = allBookings.filter(booking => {
    return booking.date === currentDate;
  });

  const bookedRoomNumbers = bookedRoomsOnDate.map(
    booking => booking.roomNumber
  );

  const availableRooms = allRooms.filter(
    room => !bookedRoomNumbers.includes(room.number)
  );
  return availableRooms;
};

const findSelectedRoom = (roomNumber, allRooms) => {
  return allRooms.rooms.filter(room => {
    return room.number === parseInt(roomNumber);
  });
};

export { allUpcomingBookings, allAvailableRooms, findSelectedRoom };
