import ship from "../Ship Object/shipObject";
import gameboard from "../Gameboard Object/gameboardObject";

const player = (name) => {
  const getName = () => name;
  const ships = [
    {
      ship: ship(5, "Carrier"),
      placed: false
    },
    {
      ship: ship(4, "Battleship"),
      placed: false
    },
    {
      ship: ship(3, "Destroyer"),
      placed: false
    },
    {
      ship: ship(3, "Submarine"),
      placed: false
    },
    {
      ship: ship(2, "Patrol Boat"),
      placed: false
    }
  ];

  const gameboardObject = gameboard();
  const getBlankGameboardObject = gameboard();

  gameboardObject.createGameboard();
  getBlankGameboardObject.createGameboard();

  const playersGameboard = gameboardObject.getGameBoardArray();
  const blankGameboard = getBlankGameboardObject.getGameBoardArray();

  const directionUp = gameboardObject.placeShipVerticalyUp;
  const directionDown = gameboardObject.placeShipVerticalyDown;
  const directionRight = gameboardObject.placeShipHorizontalyRight;
  const directionLeft = gameboardObject.placeShipHorizontalyLeft;

  const attack = (cordinates) =>
    getBlankGameboardObject.receiveAttack(cordinates);

  const selectShip = (index) => {
    if (ships[index].placed === true) {
      alert("Ship has been placed");
      return false;
    }
    return ships[index].ship;
  };

  const selectCordinates = (index) => {
    if (playersGameboard[index].isOccupied === true) {
      return false;
    }
    return playersGameboard[index].cord;
  };

  const selectDirection = (direction) => {
    if (direction === "up") {
      return directionUp;
    }
    if (direction === "down") {
      return directionDown;
    }
    if (direction === "right") {
      return directionRight;
    }
    if (direction === "left") {
      return directionLeft;
    }
    return false;
  };

  const placeShip = (shipIndex, direction, cordinatesIndex) => {
    const playerShip = selectShip(shipIndex);
    const cordinate = selectCordinates(cordinatesIndex);
    const playerdirection = selectDirection(direction);

    if (ships[shipIndex].placed === false) {
      if (playerShip === false) {
        return false;
      }
      if (cordinate === false) {
        return false;
      }

      if (playerdirection === false) {
        return false;
      }
      return gameboardObject.placeShip(playerdirection, playerShip, cordinate);
    }

    return false;
  };

  return {
    getName,
    ships,
    playersGameboard,
    attack,
    gameboardObject,
    selectShip,
    selectDirection,
    selectCordinates,
    placeShip,
    blankGameboard
  };
};

export default player;
