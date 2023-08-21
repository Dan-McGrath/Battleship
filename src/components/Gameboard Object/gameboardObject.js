/* eslint-disable prefer-destructuring */
const gameboard = () => {
  const gameboardArr = [];

  const createGameboard = () => {
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        const square = {
          cord: [],
          isOccupied: false,
          isAttacked: false
        };
        square.cord[0] = i;
        square.cord[1] = j;
        gameboardArr.push(square);
      }
    }

    return gameboardArr;
  };

  const getGameBoardArray = () => gameboardArr;

  const setOccupied = (cordinate) => {
    const board = getGameBoardArray();
    let square;
    for (let i = 0; i < board.length; i++) {
      if (JSON.stringify(board[i].cord) === JSON.stringify(cordinate)) {
        square = board[i];
        square.isOccupied = true;
      }
    }
  };

  const shipLocations = [];
  const addShipLocation = (cordinates, ship) => {
    const shipLocation = {
      shipObject: ship,
      shipCordinates: cordinates
    };
    return shipLocations.push(shipLocation);
  };
  const getShipLocations = () => shipLocations;

  const getSquare = (cordinate) => {
    const board = getGameBoardArray();
    let square;
    for (let i = 0; i < board.length; i++) {
      if (JSON.stringify(board[i].cord) === JSON.stringify(cordinate)) {
        square = i;
        return square;
      }
    }
    return false;
  };

  const checkCordinates = (cordinate) => {
    const board = getGameBoardArray();
    let square;
    for (let i = 0; i < board.length; i++) {
      if (JSON.stringify(board[i].cord) === JSON.stringify(cordinate)) {
        square = board[i];
        if (square.isOccupied === false) {
          return true;
        }
        return false;
      }
    }
    return false;
  };

  const placeShipHorizontalyRight = (cordinate, newShip) => {
    const shipLength = newShip.getLength();
    let cordinateToChange = cordinate[1];
    const newCordinates = [];
    for (let i = 0; i < shipLength; i++) {
      cordinateToChange = cordinate[1];
      cordinateToChange += i;
      const newCordinate = [cordinate[0], cordinateToChange];
      newCordinates.push(newCordinate);
    }
    if (newCordinates.every((ele) => checkCordinates(ele))) {
      return newCordinates;
    }
    return false;
  };

  const placeShipHorizontalyLeft = (cordinate, newShip) => {
    const shipLength = newShip.getLength();
    let cordinateToChange = cordinate[1];
    const newCordinates = [];
    for (let i = shipLength - 1; i >= 0; i--) {
      cordinateToChange = cordinate[1];
      cordinateToChange -= i;
      const newCordinate = [cordinate[0], cordinateToChange];
      newCordinates.push(newCordinate);
    }
    if (newCordinates.every((ele) => checkCordinates(ele))) {
      return newCordinates;
    }
    return false;
  };

  const placeShipVerticalyUp = (cordinate, newShip) => {
    const shipLength = newShip.getLength();
    let cordinateToChange = cordinate[0];
    const newCordinates = [];
    for (let i = shipLength - 1; i >= 0; i--) {
      cordinateToChange = cordinate[0];
      cordinateToChange -= i;
      const newCordinate = [cordinateToChange, cordinate[1]];
      newCordinates.push(newCordinate);
    }
    if (newCordinates.every((ele) => checkCordinates(ele))) {
      return newCordinates;
    }
    return false;
  };

  const placeShipVerticalyDown = (cordinate, newShip) => {
    const shipLength = newShip.getLength();
    let cordinateToChange = cordinate[0];
    const newCordinates = [];
    for (let i = 0; i < shipLength; i++) {
      cordinateToChange = cordinate[0];
      cordinateToChange += i;
      const newCordinate = [cordinateToChange, cordinate[1]];
      newCordinates.push(newCordinate);
    }
    if (newCordinates.every((ele) => checkCordinates(ele))) {
      return newCordinates;
    }
    return false;
  };

  const placeShip = (direction, newShip, shipCordinate) => {
    const placement = direction(shipCordinate, newShip);
    if (placement === false) {
      return false;
    }
    const shipCordinates = placement;
    for (let i = 0; i < shipCordinates.length; i++) {
      const cordinate = shipCordinates[i];
      setOccupied(cordinate);
    }
    return shipCordinates;
  };

  const shipLocatedAtAttack = (cordinate) => {
    for (let i = 0; i < shipLocations.length; i++) {
      for (let j = 0; j < shipLocations[i].shipCordinates.length; j++) {
        if (
          JSON.stringify(shipLocations[i].shipCordinates[j]) ===
          JSON.stringify(cordinate)
        ) {
          const index = shipLocations[i].shipCordinates.indexOf(
            shipLocations[i].shipCordinates[j]
          );
          shipLocations[i].shipCordinates.splice(index, 1);

          return shipLocations[i].shipObject;
        }
      }
    }
    return false;
  };

  const receiveAttack = (cordinate) => {
    const squareIndex = getSquare(cordinate);
    const board = getGameBoardArray();
    const square = board[squareIndex];
    if (square.isAttacked === true) {
      return false;
    }

    square.isAttacked = true;
    const isShipAtCordinate = shipLocatedAtAttack(cordinate);

    if (isShipAtCordinate !== false) {
      return isShipAtCordinate;
    }

    return false;
  };

  return {
    createGameboard,
    getGameBoardArray,
    placeShip,
    checkCordinates,
    placeShipHorizontalyRight,
    placeShipHorizontalyLeft,
    placeShipVerticalyUp,
    placeShipVerticalyDown,
    getShipLocations,
    addShipLocation,
    receiveAttack
  };
};

export default gameboard;
