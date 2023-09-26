//Function to find guest by username and password
const findGuest = (username, password, customerData) => {
  // Extract the numeric portion from the username using split
  const guestUsername = username.split('customer')[1];

  if (guestUsername) {
    // Convert the numeric part to an integer
    const customerId = parseInt(guestUsername, 10);

    // Check if the customerId is within the valid range
    if (customerId >= 1 && customerId <= customerData.length) {
      // Check if the customerId matches the id property of a customer
      const byId = customerData.find(user => user.id === customerId);
      if (byId) {
        return byId;
      }
    }
  }
  // Return undefined if no matching customer is found
  return undefined;
};

// // Function to validate login credentials
// const verifyLogin = (username, password, customerData) => {
//   if (!password) {
//     return 'Please enter a password.';
//   }

//   if (password !== 'overlook2021') {
//     return 'Incorrect password. Please try again.';
//   }

//   const user = findGuest(username, password, customerData);

//   if (user) {
//     currentGuest = user;
//     console.log(currentGuest);
//     return true;
//   } else {
//     return 'User not found. Please check your username.';
//   }
// };

export { findGuest };
