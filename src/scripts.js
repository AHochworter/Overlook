// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import { fetchCustomers, fetchBookings, fetchRooms } from '../src/apiCalls';
import {
  filterBookingsByGuest,
  bookingsByRoomByGuest,
  guestPastBookings,
  guestComingBookings,
  guestTotalSpent,
} from '../src/guest-bookings';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/overlook-logo.jpg';
import './images/village-on-lake.jpg';
import './images/single room.jpg';
import './images/junior suite.jpg';
import './images/residential.jpg';

//Query Selectors 👇
const dashboardView = document.getElementById('dashboardView');
const upcomingBookingsBtn = document.getElementById('upcomingBookings');
const pastBookingsBtn = document.getElementById('pastBookings');
const cardContainer = document.getElementById('cardContainer');

//Global Variables👇
const currentGuest = {
  id: 1,
  name: 'Leatha Ullrich',
};
let customerData; // You should also declare these variables
let bookingsData;
let roomData;

//Event Listeners👇
const fetchAllData = () => {
  return Promise.all([fetchCustomers(), fetchBookings(), fetchRooms()])
    .then(data => {
      // Log the data received from API calls
      console.log('Customer Data:', data[0]);
      console.log('Bookings Data:', data[1]);
      console.log('Room Data:', data[2]);

      // Assign data to global variables
      customerData = data[0].customers;
      bookingsData = data[1].bookings;
      roomData = data[2].rooms;

      // You can also log the data after assignment
      console.log('Assigned Customer Data:', customerData);
      console.log('Assigned Bookings Data:', bookingsData);
      console.log('Assigned Room Data:', roomData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};

upcomingBookingsBtn.addEventListener('click', () => {
  const upcomingBookings = guestComingBookings(
    currentGuest,
    bookingsData,
    roomData
  );

  // Log the upcoming bookings
  console.log('Upcoming Bookings:', upcomingBookings);

  displayBookings(upcomingBookings);
});

pastBookingsBtn.addEventListener('click', () => {
  const pastBookings = guestPastBookings(currentGuest, bookingsData, roomData);

  // Log the past bookings
  console.log('Past Bookings:', pastBookings);

  displayBookings(pastBookings);
});

// Call fetchAllData and loadUpcomingBookings when the page loads
window.addEventListener('load', () => {
  // Fetch all data before displaying bookings
  fetchAllData()
    .then(() => {
      // Once data is fetched, load and display upcoming bookings
      loadUpcomingBookings();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

// Function to display bookings in the cardContainer
function displayBookings(bookings) {
  // Clear the previous content in cardContainer
  cardContainer.innerHTML = '';

  // Loop through bookings and create card elements
  bookings.forEach((booking, index) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('card-wrapper', `cardWrapper-${index + 1}`);

    // Create and set card content as needed, e.g., room image, details, etc.
    // You can use booking.room and booking.date to access the room and date info

    cardContainer.appendChild(cardWrapper);
  });
}

// Function to load and display upcoming bookings
function loadUpcomingBookings() {
  const upcomingBookings = guestComingBookings(
    currentGuest,
    bookingsData,
    roomData
  );
  displayBookings(upcomingBookings);
}

//Helper Functions👇
const handleDates = date => {
  date.replaceAll('-', '/');
};

const removeHiddenClass = elements => {
  elements.forEach(element => {
    element.classList.remove('hidden');
  });
  return elements;
};

const addHiddenClass = elements => {
  elements.forEach(element => {
    element.classList.add('hidden');
  });
  return elements;
};
