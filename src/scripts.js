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
import { filterRoomsByType } from '../src/filter-rooms';

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
const dashboardView = document.getElementById('dashboardView');
const cardContainer = document.getElementById('cardContainer');
const roomContainer = document.querySelector('.room-container');
const welcomeUser = document.getElementById('welcomeUser');
const totalSpent = document.getElementById('totalSpent');
const bookRoomOne = document.getElementById('bookARoomOne');
// const searchForm = document.querySelector('form');
const bookRoomTwo = document.getElementById('bookARoomTwo');
const selectedRoomContainer = document.querySelector('.selected-room');

//BUTTONS
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
const currentGuest = {
  id: 17,
  name: 'Trudie Grimes',
};
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

dashboardView.addEventListener('click', () => {
  removeHiddenClass([
    cardContainer,
    bookRoomBtn,
    logoutBtn,
    welcomeUser,
    totalSpent,
  ]);
  addHiddenClass([bookRoomOne, bookRoomTwo, selectedRoomContainer]);

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
  removeHiddenClass([bookRoomOne, logoutBtn, dashboardBtn]);
  addHiddenClass([
    cardContainer,
    bookRoomBtn,
    welcomeUser,
    totalSpent,
    dashboardView,
    selectedRoomContainer,
  ]);
  // document.body.classList.add('show-room-container');
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
          <p class="num-beds">Number of Beds: ${room.numBeds}</p>
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

const bookNowHandler = (e, allRooms) => {
  if (e.target.className === 'bookBtn') {
    console.log(e.target.className === 'bookBtn');
    // clearView([confirmationMsg, filterButtons]);
    // toggleHidden('add', [results, resultsMsg]);
    // toggleHidden('remove', [individualBookingView]);

    const selectedRoom = findSelectedRoom(
      e.target.nextElementSibling.id,
      allRooms
    );
    displaySelectedBooking(e, selectedRoom[0]);
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
