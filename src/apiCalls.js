export const fetchCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => {
      // Check if the response status is in the range 200-299 (successful)
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
      throw error; // Re-throw the error to propagate it to the caller if needed
    });
};

export const fetchBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => {
      // Check if the response status is in the range 200-299 (successful)
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
      throw error; // Re-throw the error to propagate it to the caller if needed
    });
};

export const fetchRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => {
      // Check if the response status is in the range 200-299 (successful)
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
      throw error; // Re-throw the error to propagate it to the caller if needed
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
