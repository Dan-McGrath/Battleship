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

  gameboardObject.createGameboard();
  const playersGameboard = gameboardObject.getGameBoardArray();

  const directionUp = gameboardObject.placeShipVerticalyUp;
  const directionDown = gameboardObject.placeShipVerticalyDown;
  const directionRight = gameboardObject.placeShipHorizontalyRight;
  const directionLeft = gameboardObject.placeShipHorizontalyLeft;

  const attack = (cordinates) => cordinates;

  const selectShip = (index) => {
    if (ships[index].placed === true) {
      ships[index].placed = false;
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
    const cordinate = selectCordinates(cordinatesIndex);
    const playerdirection = selectDirection(direction);
    const playerShip = selectShip(shipIndex);
    if (ships[shipIndex].placed === "false") {
      if (cordinate === false) {
        return false;
      }

      if (playerdirection === false) {
        return false;
      }
      console.log(
        gameboardObject.placeShip(playerdirection, playerShip, cordinate)
      );
      return gameboardObject.placeShip(playerdirection, playerShip, cordinate);
    }
    return true;
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
    placeShip
  };
};

export default player;
