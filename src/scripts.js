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
import { allAvailableRooms, findSelectedRoom } from '../src/new-bookings';
import { findGuest } from '../src/login';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/overlook-logo.jpg';
import './images/village-on-lake.jpg';
import './images/single room.jpg';
import './images/junior suite.jpg';
import './images/residential suite.jpg';
import './images/suite.jpg';
import './images/room1.jpg';
import './images/room2.jpg';

//Query Selectors 👇
const loginView = document.querySelector('.login-view');
const username = document.getElementById('username');
const password = document.getElementById('password');
const dashboardView = document.getElementById('dashboardView');
const bookRoomOne = document.getElementById('bookARoomOne');
const bookRoomTwo = document.getElementById('bookARoomTwo');
const welcomeUser = document.getElementById('welcomeUser');
const totalSpent = document.getElementById('totalSpent');
const cardContainer = document.getElementById('cardContainer');
const roomContainer = document.querySelector('.room-container');
const selectedRoomContainer = document.querySelector('.selected-room');

//BUTTONS
const loginBtn = document.querySelector('.login-btn');
const upcomingBookingsBtn = document.getElementById('upcomingBookings');
const pastBookingsBtn = document.getElementById('pastBookings');
const bookRoomBtn = document.getElementById('bookRoomBtn');
const logoutBtn = document.getElementById('logOutBtn');
const dashboardBtn = document.getElementById('dashboard');
const selectDateBtn = document.querySelector('.select-date-btn');
const singleRoom = document.querySelector('.single-room');
const juniorSuite = document.querySelector('.junior-suite');
const residential = document.querySelector('.residential');
const suite = document.querySelector('.suite');

//Global Variables👇
let currentGuest;
let customerData;
let bookingsData;
let roomData;
let selectedRoomType = null;

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

loginBtn.addEventListener('click', event => {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log('login button clicked');
  const enteredUsername = username.value;
  const enteredPassword = password.value;

  if (verifyLogin(enteredUsername, enteredPassword, customerData)) {
    // Login is successful, set currentGuest and update the UI
    currentGuest = findGuest(enteredUsername, enteredPassword, customerData);
    console.log(currentGuest);
    removeHiddenClass([
      dashboardView,
      cardContainer,
      bookRoomBtn,
      logoutBtn,
      welcomeUser,
      totalSpent,
    ]);
    addHiddenClass([
      loginView,
      bookRoomOne,
      bookRoomTwo,
      selectedRoomContainer,
    ]);

    // Calculate the total spent and update the totalSpent element
    const guestTotal = guestTotalSpent(currentGuest, bookingsData, roomData);
    totalSpent.textContent = `Your total Spent is $${guestTotal.toFixed(2)}`;

    // Update the welcome message
    welcomeUser.textContent = `Welcome Back ${currentGuest.name}!`;
  } else {
    // Login failed, you can display an error message here
    console.log('Login failed');
    // Display an error message to the user, e.g., by modifying the DOM
  }
});

const verifyLogin = (username, password, customerData) => {
  const user = findGuest(username, password, customerData);

  if (user) {
    currentGuest = user; // Set the currentGuest upon successful login
    return true; // Return true to indicate successful login
  } else {
    return false; // Return false to indicate failed login
  }
};

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

logoutBtn.addEventListener('click', () => {
  location.reload();
});

bookRoomBtn.addEventListener('click', () => {
  console.log('Book Room Clicked');
  document.getElementById('dateOfStay').value = '';
  roomContainer.innerHTML = '';

  removeHiddenClass([bookRoomOne, logoutBtn, dashboardBtn]);
  addHiddenClass([
    cardContainer,
    bookRoomBtn,
    welcomeUser,
    totalSpent,
    dashboardView,
    selectedRoomContainer,
  ]);
});

singleRoom.addEventListener('click', () => {
  selectedRoomType = 'single room';
  console.log('Single Room Clicked');
  // filterRoomsByType(roomData, type);
  displaySearchResults();
});

juniorSuite.addEventListener('click', () => {
  selectedRoomType = 'junior suite';
  console.log('junior suite Clicked');
  // filterRoomsByType(roomData, type);
  displaySearchResults();
});

residential.addEventListener('click', () => {
  selectedRoomType = 'residential suite';
  console.log('residential Clicked');
  // filterRoomsByType(roomData, type);
  displaySearchResults();
});

suite.addEventListener('click', () => {
  selectedRoomType = 'suite';
  console.log('suite Clicked');
  displaySearchResults();
});

dashboardBtn.addEventListener('click', () => {
  console.log('Dashboard Button Clicked');
  removeHiddenClass([
    dashboardView,
    cardContainer,
    bookRoomBtn,
    welcomeUser,
    totalSpent,
  ]);
  addHiddenClass([loginView, bookRoomOne, bookRoomTwo, selectedRoomContainer]);
});

// Call fetchAllData and loadUpcomingBookings when the page loads
window.addEventListener('load', () => {
  // Fetch all data before displaying bookings
  fetchAllData()
    .then(() => {
      if (currentGuest) {
        displayBookings(bookingsData, roomData);
      }
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
      cardContainer.innerHTML += `
      <div class="card-wrapper"> 
        <div class="img-wrapper">
          <img class="room-img" src="./images/${
            roomDetails.room.roomType
          }.jpg" alt="${roomDetails.room.roomType}" />
        </div>
        <div class="card room-details-wrapper">
        <h3 class="room-type">${roomDetails.room.roomType.toUpperCase()}</h3>
        <h4 class="room-details room-number">Room Number: ${
          roomDetails.room.number
        }</h4>
        <h4 class="room-details bedsize">Bedsize: ${
          roomDetails.room.bedSize
        }</h4>
        <h4 class="room-details num-beds">Number of Beds: ${
          roomDetails.room.numBeds
        }</h4>
        <h4 class="room-details room-cost">Cost Per Night: ${
          roomDetails.room.costPerNight
        }</h4>
      </div>
    </div>`;
    }
  });
}

selectDateBtn.addEventListener('click', displaySearchResults);

//
function displaySearchResults() {
  const searchDateValue = document.getElementById('dateOfStay').value;
  const searchDate = searchDateValue.replaceAll('-', '/');

  // Filter rooms by availability and selected room type if one is selected
  let filteredRooms = allAvailableRooms(roomData, bookingsData, searchDate);

  if (selectedRoomType !== null) {
    filteredRooms = filteredRooms.filter(
      room => room.roomType === selectedRoomType
    );
  }

  if (filteredRooms.length === 0) {
    // Handle case where no rooms match the criteria
    roomContainer.innerHTML = `
      <div class="no-rooms-available-message">
        <p class="no-rooms-match">No Rooms Available</p>
      </div>`;
    cardContainer.classList.add('hidden');
    roomContainer.classList.remove('hidden');
  } else {
    // Display the filtered rooms
    cardContainer.classList.add('hidden');
    roomContainer.classList.remove('hidden');

    roomContainer.innerHTML = ''; // Clear existing content

    filteredRooms.forEach(room => {
      roomContainer.innerHTML += `
        <div class="card-wrapper"> 
          <div class="img-wrapper">
            <img class="room-img" src="./images/${room.roomType}.jpg" alt="${room.roomType}" />
          </div>
          <div class="card room-details-wrapper">
          <h3 class="room-type">${room.roomType}</h3>
          <h4 class="bedsize">Bedsize: ${room.bedSize}</h4>
          <h4 class="num-beds">Number of Beds: ${room.numBeds}</h4>
          <button class="bookBtn">Book Now!</button>
          </div>
        </div>`;
    });
  }
}

roomContainer.addEventListener('click', event => {
  if (event.target.classList.contains('bookBtn')) {
    const roomCard = event.target.closest('.card-wrapper');
    const roomType = roomCard.querySelector('.room-type').textContent;
    // You can use the roomType or any other information you need to book the room.

    // Find the selected room based on roomType (modify this logic if needed)
    const selectedRoom = roomData.find(room => room.roomType === roomType);

    if (selectedRoom) {
      displaySelectedBooking(selectedRoom);
    }
  }
});

const displaySelectedBooking = selectedRoom => {
  addHiddenClass([bookRoomOne]);
  removeHiddenClass([bookRoomTwo, selectedRoomContainer]);

  // Clear the content of selectedRoomContainer
  selectedRoomContainer.innerHTML = '';

  selectedRoomContainer.innerHTML = `
    <article class="selected-room">
      <div class="single-img-wrapper">
        <img class="single-img" src="./images/${
          selectedRoom.roomType
        }.jpg" alt="hotel room image">
      </div>
      <div class="single-card-main-wrapper">
        <div class="single-card-text-wrapper">
          <h3 class="card-booking-text">We Look Forward to Your Visit.  You're Reserving:</h3>
          <p class="card-booking-text roomType">${selectedRoom.roomType[0].toUpperCase()}${selectedRoom.roomType.substring(
    1
  )} with ${selectedRoom.numBeds} ${selectedRoom.bedSize} sized beds</p>
          <p class="card-booking-text roomNumber">Room Number: ${
            selectedRoom.number
          }</p>
          <p class="card-booking-text roomCost" id="${
            selectedRoom.number
          }">Cost Per Night: $${selectedRoom.costPerNight}</p>
          <button class="reserve bookBtn" id="${
            selectedRoom.number
          }">Reserve Now</button>
          <button class="close">Go Back</button>
        </div>
      </div>
    </article>`;
};
