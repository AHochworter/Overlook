// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import {
  fetchCustomers,
  fetchBookings,
  fetchRooms,
  sendBookingToServer,
} from '../src/apiCalls';
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
const openingImage = document.querySelector('.opening-img');
const selectDataForm = document.querySelector('.book-a-room-form');
const roomsAvailMessage = document.getElementById('roomsAvail');
const dateSelected = (document.getElementById('dateOfStay').min = new Date()
  .toISOString()
  .split('T')[0]);

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
const allRoomTypes = document.querySelector('.all-room-types');

//Global Variables👇
let currentGuest;
let customerData;
let bookingsData;
let roomData;
let selectedRoomType = null;
let searchDate;

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
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
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
  event.preventDefault();
  console.log('login button clicked');
  const enteredUsername = username.value;
  const enteredPassword = password.value;

  // Check if the password field is empty
  if (!enteredPassword) {
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = 'Please enter a password.';
    return;
  }

  // Check the login result
  const loginResult = verifyLogin(
    enteredUsername,
    enteredPassword,
    customerData
  );

  if (loginResult === true) {
    currentGuest = findGuest(enteredUsername, enteredPassword, customerData);
    console.log(currentGuest);
    removeHiddenClass([
      dashboardView,
      openingImage,
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
    totalSpent.textContent = `Your total Spent for PAST Stays is $${guestTotal.toFixed(
      2
    )}`;

    // Update the welcome message
    welcomeUser.textContent = `Welcome Back ${currentGuest.name}!`;
  } else {
    // Login failed, display an error message to the user
    console.log('Login failed');
    const errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.textContent = loginResult;
  }
});

const verifyLogin = (username, password, customerData) => {
  if (!password) {
    return 'Please enter a password.';
  }

  if (password !== 'overlook2021') {
    return 'Incorrect password. Please try again.';
  }

  const user = findGuest(username, password, customerData);

  if (user) {
    currentGuest = user;
    console.log(currentGuest);
    return true;
  } else {
    return 'User not found. Please check your username.';
  }
};

upcomingBookingsBtn.addEventListener('click', () => {
  const upcomingBookings = guestComingBookings(
    currentGuest,
    bookingsData,
    roomData
  );
  addHiddenClass([openingImage]);

  if (upcomingBookings.length === 0) {
    // const message = 'You have no upcoming bookings.';
    cardContainer.innerHTML += `<div class="display-message">
    <h3>You Have Not Booked Any Upcoming Visits Yet.</h3>
    </div>`;
  } else {
    displayBookings(upcomingBookings, roomData);
  }
});

pastBookingsBtn.addEventListener('click', () => {
  const pastBookings = guestPastBookings(currentGuest, bookingsData, roomData);

  // Log the past bookings
  console.log('Past Bookings:', pastBookings);
  addHiddenClass([openingImage]);

  displayBookings(pastBookings, roomData);
});

logoutBtn.addEventListener('click', () => {
  location.reload();
});

bookRoomBtn.addEventListener('click', () => {
  console.log('Book Room Clicked');
  document.getElementById('dateOfStay').value = '';
  roomContainer.innerHTML = '';
  selectedRoomType = null;

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
  displaySearchResults();
});

juniorSuite.addEventListener('click', () => {
  selectedRoomType = 'junior suite';
  displaySearchResults();
});

residential.addEventListener('click', () => {
  selectedRoomType = 'residential suite';
  displaySearchResults();
});

suite.addEventListener('click', () => {
  selectedRoomType = 'suite';
  displaySearchResults();
});

allRoomTypes.addEventListener('click', () => {
  selectedRoomType = null;
  displaySearchResults();
});

dashboardBtn.addEventListener('click', () => {
  cardContainer.innerHTML = `<img class="opening-img "src="./images/village-on-lake.jpg"/>`;
  removeHiddenClass([
    openingImage,
    dashboardView,
    cardContainer,
    bookRoomBtn,
    welcomeUser,
    totalSpent,
  ]);
  addHiddenClass([
    loginView,
    bookRoomOne,
    bookRoomTwo,
    roomContainer,
    selectedRoomContainer,
    dashboardBtn,
  ]);
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
  cardContainer.innerHTML = '';
  bookings.forEach(booking => {
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
        <h3 class="date-booked">Date: ${new Date(
          booking.date
        ).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}</h3>
        <h4 class="room-details room-number">Room Number: ${
          roomDetails.room.number
        }</h4>
        <h4 class="room-details">${roomDetails.room.numBeds} ${
        roomDetails.room.bedSize
      } bed(s)</h4>
        <h4 class="room-details room-cost">Cost Per Night: $${
          roomDetails.room.costPerNight
        }</h4>
      </div>
    </div>`;
    }
  });
}

selectDataForm.addEventListener('submit', event => {
  event.preventDefault();
  displaySearchResults();
});

function displaySearchResults() {
  const searchDateValue = document.getElementById('dateOfStay').value;

  // Check if a date has been selected
  if (!searchDateValue) {
    roomContainer.innerHTML = `
      <div class="no-date-selected-message">
        <p class="no-dates-match">Please Select A Date</p>
      </div>`;
    return; // Exit the function early
  }

  searchDate = searchDateValue.replaceAll('-', '/');

  // Filter rooms by availability and selected room type if one is selected
  let filteredRooms = allAvailableRooms(roomData, bookingsData, searchDate);

  removeHiddenClass([roomsAvailMessage]);
  roomsAvailMessage.textContent = `There are ${filteredRooms.length} rooms available!`;

  console.log('filtered-available rooms', filteredRooms);

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
        <div class="card-wrapper" data-room-number="${room.number}"> 
          <div class="img-wrapper">
            <img class="room-img" src="./images/${room.roomType}.jpg" alt="${
        room.roomType
      }" />
          </div>
          <div class="card room-details-wrapper">
          <h3 class="room-type">${room.roomType.toUpperCase()}</h3>
          <h3 class="room-number room-details">Room Number: ${room.number}</h3>
          <h4 class="bedsize room-details">Bedsize: ${room.bedSize}</h4>
          <h4 class="num-beds room-details">Number of Beds: ${room.numBeds}</h4>
          <button class="bookBtn">Book Now!</button>
          </div>
        </div>`;
    });
  }
}

roomContainer.addEventListener('click', event => {
  if (event.target.classList.contains('bookBtn')) {
    // Handle room booking
    handleRoomBooking(event);
  }
});

const handleRoomBooking = event => {
  const roomCard = event.target.closest('.card-wrapper');
  const roomNumber = parseInt(roomCard.dataset.roomNumber); // Assuming you set a "data-room-number" attribute in your HTML
  const selectedRoom = roomData.find(room => room.number === roomNumber);

  if (selectedRoom) {
    // Display booking details for the selected room
    displaySelectedBooking(selectedRoom);
  }
};

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
          <h3 class="card-booking-text">We Look Forward to Your Visit!</h3>
          <h3 class="date-booked">Date: ${new Date(
            searchDate
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}</h3>
          <p class="card-booking-text roomType">${selectedRoom.roomType[0].toUpperCase()}${selectedRoom.roomType.substring(
    1
  )} with ${selectedRoom.numBeds} ${selectedRoom.bedSize} sized bed(s)</p>
          <p class="card-booking-text roomNumber">Room Number: ${
            selectedRoom.number
          }</p>
          <p class="card-booking-text roomCost" id="${
            selectedRoom.number
          }">Cost Per Night: $${selectedRoom.costPerNight}</p>
          <p class="reservation-message hidden">Thank you ${currentGuest.name}! 
          Your Reservation has been booked.</p>
          <button class="reserve bookBtn" id="${
            selectedRoom.number
          }">Reserve Now</button>
          </div>
      </div>
    </article>`;

  const reserveButton = selectedRoomContainer.querySelector('.reserve.bookBtn');
  reserveButton.addEventListener('click', () => {
    console.log('reserve button clicked');
    handleReservation(selectedRoom, searchDate);
  });
};

const handleReservation = (selectedRoom, searchDate) => {
  const bookingData = {
    userID: currentGuest.id,
    date: searchDate,
    roomNumber: selectedRoom.number,
  };
  const reserveButton = selectedRoomContainer.querySelector('.reserve');
  reserveButton.classList.add('hidden');

  // Unhide the reservation message
  const reservationMessage = selectedRoomContainer.querySelector(
    '.reservation-message'
  );
  reservationMessage.classList.remove('hidden');

  sendBookingToServer(bookingData)
    .then(() => {
      return fetchBookings();
    })
    .then(data => {
      //Update the global bookingsData variable
      bookingsData = data.bookings;
      console.log(bookingsData);

      displayBookings(bookingsData, roomData);
    })
    .catch(error => {
      console.error('Error in handleReservation:', error);
    });
};
