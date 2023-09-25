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

  // Create a fetch POST request with the booking data
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking), // Convert the booking object to JSON
  })
    .then(response => {
      if (response.ok) {
        console.log('Booking successful');

        // After a successful POST, refresh the bookings data with a GET request
        return fetch('http://localhost:3001/api/v1/bookings'); // Return the GET request
      } else {
        // Booking failed, handle the error here
        console.error('Booking failed');
        throw new Error('Booking failed'); // Propagate the error for further handling
      }
    })
    .then(response => response.json()) // Parse the response from the GET request
    .then(data => {
      // Handle the refreshed bookings data here
      console.log('Refreshed Bookings Data:', data);
      // You can update your UI with the refreshed data
    })
    .catch(error => {
      console.error('Error sending booking:', error);
      // Handle errors (e.g., display an error message)
    });
};
