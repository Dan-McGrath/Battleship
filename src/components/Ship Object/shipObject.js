const ship = (length, name) => {
  let numberOfHits = 0;
  let sunk = false;

  const getName = () => name;
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
  return { hit, isSunk, getLength, getName };
};

export default ship;
