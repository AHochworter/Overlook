const filterRoomsByType = (roomData, type) => {
  const filteredType = roomData.filter(room => {
    return room.roomType === type;
  });
  return filteredType;
};

export { filterRoomsByType };
