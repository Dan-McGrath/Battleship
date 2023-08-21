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
    for (let i = shipLength; i >= 0; i--) {
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
    for (let i = shipLength; i >= 0; i--) {
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
    return true;
  };

  return {
    createGameboard,
    getGameBoardArray,
    placeShip,
    checkCordinates,
    placeShipHorizontalyRight,
    placeShipHorizontalyLeft,
    placeShipVerticalyUp,
    placeShipVerticalyDown
  };
};

export default gameboard;
