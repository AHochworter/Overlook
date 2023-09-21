function getRandomGuest(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

const filterBookingsByGuest = (currentGuest, allBookings) => {
  console.log(currentGuest);
  return allBookings.filter(booking => {
    return booking.userID === currentGuest.id;
  });
};

export { getRandomGuest, filterBookingsByGuest };
