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
import { allUpcomingBookings, allAvailableRooms } from '../src/new-bookings';

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
const cardContainer = document.getElementById('cardContainer');
const roomContainer = document.querySelector('.room-container');
const welcomeUser = document.getElementById('welcomeUser');
const totalSpent = document.getElementById('totalSpent');
const bookRoomOne = document.getElementById('bookARoomOne');
const searchForm = document.querySelector('form');

//BUTTONS
const upcomingBookingsBtn = document.getElementById('upcomingBookings');
const pastBookingsBtn = document.getElementById('pastBookings');
const bookRoomBtn = document.getElementById('bookRoomBtn');
const logoutBtn = document.getElementById('logOutBtn');
const selectDateBtn = document.querySelector('.select-date-btn');

//Global Variables👇
const currentGuest = {
  id: 17,
  name: 'Trudie Grimes',
};
let customerData;
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

dashboardView.addEventListener('click', () => {
  removeHiddenClass([
    cardContainer,
    bookRoomBtn,
    logoutBtn,
    welcomeUser,
    totalSpent,
  ]);
  addHiddenClass([bookRoomOne]);
  // document.body.classList.remove('show-room-container');

  // Calculate the total spent and update the totalSpent element
  const guestTotal = guestTotalSpent(currentGuest, bookingsData, roomData);
  totalSpent.textContent = `Your total Spent is $${guestTotal.toFixed(2)}`;

  // Update the welcome message
  welcomeUser.textContent = `Welcome Back ${currentGuest.name}!`;
});

upcomingBookingsBtn.addEventListener('click', () => {
  console.log('Upcoming was clicked');
  const upcomingBookings = guestComingBookings(
    currentGuest,
    bookingsData,
    roomData
  );

  // Log the upcoming bookings
  console.log('Upcoming Bookings:', upcomingBookings);

  displayBookings(upcomingBookings, roomData);
});

pastBookingsBtn.addEventListener('click', () => {
  console.log('Past Stays was clicked');
  const pastBookings = guestPastBookings(currentGuest, bookingsData, roomData);

  // Log the past bookings
  console.log('Past Bookings:', pastBookings);

  displayBookings(pastBookings, roomData);
});

bookRoomBtn.addEventListener('click', () => {
  console.log('Book Room Clicked');
  removeHiddenClass([bookRoomOne]);
  addHiddenClass([
    cardContainer,
    bookRoomBtn,
    logoutBtn,
    welcomeUser,
    totalSpent,
    dashboardView,
  ]);
  // document.body.classList.add('show-room-container');
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

function displayBookings(bookings, roomData) {
  // Clear the previous content in cardContainer
  cardContainer.innerHTML = '';

  // Loop through the bookings and create card elements
  bookings.forEach(booking => {
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

selectDateBtn.addEventListener('click', () => {
  const searchDateValue = document.getElementById('dateOfStay').value;
  console.log(searchDateValue);
  const searchDate = searchDateValue.replaceAll('-', '/'); //need to format the date to be 11/12/2023 instead of 11-12-2023
  console.log(searchDate);

  const roomsAvailable = allAvailableRooms(roomData, bookingsData, searchDate);
  console.log(roomsAvailable);

  if (roomsAvailable.length === 0) {
    console.log('No rooms Available');
    // Correct the condition here
    roomContainer.innerHTML = `
      <div class="no-rooms-available-message">
        <p class="no-rooms-match">No Rooms Available</p>
      </div>`;

    // Hide cardContainer and show roomContainer
    cardContainer.classList.add('hidden');
    roomContainer.classList.remove('hidden');
  } else {
    console.log('Rooms Available');
    cardContainer.classList.add('hidden');
    roomContainer.classList.remove('hidden');

    roomsAvailable.forEach(room => {
      roomContainer.innerHTML += `
      <div class="card-wrapper"> 
        <div class="img-wrapper">
          <img class="room-img" src="./images/single room.jpg" alt="single room" />
        </div>
        <div class="card room-details-wrapper">
          <h3 class="room-type">Room: ${room.roomType}</h3>
          <h4 class="bedsize">Bedsize: ${room.bedSize}</h4>
          <p class="num-beds">Number of Beds: ${room.numBeds}</p>
     
      </div>`;
    });
    roomContainer.innerHTML += `</div>`;

    // Show cardContainer and hide roomContainer
  }
});
