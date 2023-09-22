const guestLogin = number => {
  if (number) {
    return {
      [`customer${number}`]: {
        username: `customer${number}`,
        password: 'overlook2021',
      },
    };
  }
};

const verifyLoginInfo = (username, password) => {
  if (username && password) {
    return matchGuest(username, password);
  } else {
    return 'Please enter both a username and password';
  }
};

const matchGuest = (username, password) => {
  const customerId = getGuestId(username);
  if (customerId > 0 && customerId <= 50) {
    return validatePassword(customerId, password);
  } else {
    return 'Sorry, username not found';
  }
};

const validatePassword = (id, password) => {
  if (password === guestLogin(id)[`customer${id}`].password) {
    return true;
  }
};

const getGuestId = username => {
  if (username.length === 10 || username.length === 9) {
    return parseInt(username.split('customer')[1]);
  }
};

export {
  guestLogin,
  verifyLoginInfo,
  matchGuest,
  validatePassword,
  getGuestId,
};
