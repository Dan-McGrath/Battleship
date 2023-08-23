const ship = (length, name) => {
  let numberOfHits = 0;
  let sunk = false;
  const getNumberofHits = () => numberOfHits;
  const getName = () => name;
  const getLength = () => length;

  const isSunk = () => {
    if (numberOfHits >= getLength()) {
      sunk = true;
    }
    return false;
  };

  const hit = () => {
    numberOfHits++;
    if (numberOfHits >= getLength()) {
      isSunk();
    }
    return numberOfHits;
  };

  return { hit, isSunk, getLength, getName, getNumberofHits };
};

export default ship;
