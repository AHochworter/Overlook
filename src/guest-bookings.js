function getRandomGuest(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

const filterBookingsByGuest = (currentGuest, allBookings) => {
  return allBookings.filter(booking => {
    return booking.userID === currentGuest.id;
  });
};

const bookingsByRoomByGuest = (currentGuest, allBookings, allRooms) => {
  // Filter bookings by currentGuest
  const guestBookings = filterBookingsByGuest(currentGuest, allBookings);

  // Now take bookings for this guest and find the rooms that match
  const bookingsByRoom = guestBookings.map(booking => {
    const guestRoom = allRooms.find(room => {
      return room.number === booking.roomNumber;
    });

    // Return the room object
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
    // Convert the booking date to a JavaScript Date object -> not sure about this step.
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
    // Convert the booking date to a JavaScript Date object -> not sure about this step.
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
    // Get costPerNight from the room object within each booking
    const costPerNight = booking.room.costPerNight;
    acc += costPerNight;

    return acc;
  }, 0);
  return guestTotal;
};

export {
  getRandomGuest,
  filterBookingsByGuest,
  bookingsByRoomByGuest,
  guestPastBookings,
  guestComingBookings,
  guestTotalSpent,
};
