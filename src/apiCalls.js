export const fetchCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

export const fetchBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

export const fetchRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

export const sendBookingToServer = booking => {
  const url = 'http://localhost:3001/api/v1/bookings';

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error('Booking failed');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error sending booking:', error);
      throw error;
    });
};
