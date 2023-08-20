const ship = (length) => {
  let numberOfHits = 0;
  let sunk = false;

  const getLength = () => length;

  const hit = () => {
    numberOfHits++;
    return numberOfHits;
  };

  const isSunk = () => {
    if (numberOfHits >= getLength()) {
      sunk = true;
    }
    return sunk;
  };
  return { hit, isSunk, getLength };
};

export default ship;
