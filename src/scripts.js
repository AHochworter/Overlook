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
      displayBookings(bookingsData, roomData);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

// Function to display bookings in the cardContainer
// function displayBookings(bookingsData, roomData) {
//   // Clear the previous content in cardContainer
//   cardContainer.innerHTML = '';
//   // Filter bookings for the current guest
//   const guestBookings = filterBookingsByGuest(currentGuest, bookingsData);
//   // Loop through the guest's bookings and create card elements
//   guestBookings.forEach(booking => {
//     // Find the room details for this booking
//     const roomDetails = bookingsByRoomByGuest(
//       currentGuest,
//       bookingsData,
//       roomData
//     ).find(item => item.date === booking.date);
//     if (roomDetails) {
//       // Create a card element for this booking and its room details
//       // const cardElement = document.createElement('div');
//       // cardElement.classList.add('card-wrapper');
//       cardContainer.innerHTML = `
//       <div class="card card-wrapper" id="cardWrapper">
//         <div class="img-wrapper">
//           <img class="room-img" src="./images/single room.jpg" alt="single room" />
//         </div>
//         <div class=" card room-details-wrapper">
//           <h4 class="room-type">${roomDetails.room.roomType}</h4>
//           <h3 class="bedsize">${roomDetails.room.bedSize}</h3>
//           <p class="num-beds">${roomDetails.room.numBeds}</p>
//         </div>
//       </div>
//       `;
//     }
//   });
// }

// Function to load and display upcoming bookings
function loadUpcomingBookings() {
  const upcomingBookings = guestComingBookings(
    currentGuest,
    bookingsData,
    roomData
  );
  displayBookings(upcomingBookings);
}

function displayBookings(bookingsData, roomData) {
  // Clear the previous content in cardContainer
  cardContainer.innerHTML = '';

  // Filter bookings for the current guest
  const guestBookings = filterBookingsByGuest(currentGuest, bookingsData);

  // Loop through the guest's bookings and create card elements
  guestBookings.forEach(booking => {
    // Find the room details for this booking
    const roomDetails = bookingsByRoomByGuest(
      currentGuest,
      bookingsData,
      roomData
    ).find(item => item.date === booking.date);

    if (roomDetails) {
      // Create a card element for this booking and its room details
      const cardElement = document.createElement('div');
      cardElement.classList.add('card', 'card-wrapper'); // Add classes to the card element
      cardElement.innerHTML = `
        <div class="img-wrapper">
          <img class="room-img" src="./images/single room.jpg" alt="single room" />
        </div>
        <div class="card room-details-wrapper">
          <h3 class="room-type">Room: ${roomDetails.room.roomType}</h3>
          <h4 class="bedsize">Bedsize: ${roomDetails.room.bedSize}</h4>
          <p class="num-beds">Number of Beds: ${roomDetails.room.numBeds}</p>
        </div>
      `;

      // Append the card element to the cardContainer
      cardContainer.appendChild(cardElement);
    }
  });
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
