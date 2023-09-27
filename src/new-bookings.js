const allUpcomingBookings = (allBookings, currentDate) => {
  const upcomingBookings = allBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate >= currentDate;
  });
  return upcomingBookings;
};

const allAvailableRooms = (allRooms, allBookings, currentDate) => {
  // Get the room numbers that are booked for the given date.
  const bookedRoomsOnDate = allBookings.filter(booking => {
    // const bookingDate = new Date(booking.date);
    // const bookingDate = bookingDateValue.replaceAll('-', '/');
    return booking.date === currentDate; // Check if booking date matches the currentDate.
  });

  const bookedRoomNumbers = bookedRoomsOnDate.map(
    booking => booking.roomNumber
  );

  // Filter the available rooms by checking if their room number is not in the bookedRoomNumbers array.
  const availableRooms = allRooms.filter(
    room => !bookedRoomNumbers.includes(room.number)
  );
  // console.log({ availableRooms });
  return availableRooms;
};

const findSelectedRoom = (roomNumber, allRooms) => {
  return allRooms.rooms.filter(room => {
    return room.number === parseInt(roomNumber);
  });
};

export { allUpcomingBookings, allAvailableRooms, findSelectedRoom };
