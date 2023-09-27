const findGuest = (username, password, customerData) => {
  const guestUsername = username.split('customer')[1];

  if (guestUsername) {
    const customerId = parseInt(guestUsername, 10);

    if (customerId >= 1 && customerId <= customerData.length) {
      const byId = customerData.find(user => user.id === customerId);
      if (byId) {
        return byId;
      }
    }
  }
  return undefined;
};

export { findGuest };
