const filterBookingsByGuest = (currentGuest, allBookings) => {
  return allBookings.filter(booking => {
    return booking.userID === currentGuest.id;
  });
};

const bookingsByRoomByGuest = (currentGuest, allBookings, allRooms) => {
  const guestBookings = filterBookingsByGuest(currentGuest, allBookings);

  const bookingsByRoom = guestBookings.map(booking => {
    const guestRoom = allRooms.find(room => {
      return room.number === booking.roomNumber;
    });
    return {
      room: guestRoom,
      date: booking.date,
    };
  });
  return bookingsByRoom;
};

const guestPastBookings = (currentGuest, allBookings, allRooms) => {
  const guestBookings = bookingsByRoomByGuest(
    currentGuest,
    allBookings,
    allRooms
  );
  const currentDate = new Date();
  const pastBookings = guestBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate < currentDate;
  });
  return pastBookings;
};

const guestComingBookings = (currentGuest, allBookings, allRooms) => {
  const guestBookings = bookingsByRoomByGuest(
    currentGuest,
    allBookings,
    allRooms
  );
  const currentDate = new Date();
  const upcomingBookings = guestBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate >= currentDate;
  });
  return upcomingBookings;
};

const guestTotalSpent = (currentGuest, allBookings, allRooms) => {
  const guestPriorBookings = guestPastBookings(
    currentGuest,
    allBookings,
    allRooms
  );
  const guestTotal = guestPriorBookings.reduce((acc, booking) => {
    const costPerNight = booking.room.costPerNight;
    acc += costPerNight;

    return acc;
  }, 0);
  return guestTotal;
};

export {
  filterBookingsByGuest,
  bookingsByRoomByGuest,
  guestPastBookings,
  guestComingBookings,
  guestTotalSpent,
};
