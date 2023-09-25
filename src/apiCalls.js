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
  // Define the URL where you want to send the POST request
  const url = 'http://localhost:3001/api/v1/bookings';

  // Create a fetch request with the booking data
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking), // Convert the booking object to JSON
  })
    .then(response => {
      if (response.ok) {
        // Booking was successful, you can handle this as needed
        // For example, show a success message to the user.
        console.log('Booking successful');
        // You can update the UI or navigate to a confirmation page.
      } else {
        // Booking failed, handle the error here
        console.error('Booking failed');
        // You can show an error message to the user.
      }
    })
    .catch(error => {
      console.error('Error sending booking:', error);
      // Handle network errors or other issues here
      // You can show an error message to the user.
    });
};
