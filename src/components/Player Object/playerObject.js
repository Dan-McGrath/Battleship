import ship from "../Ship Object/shipObject";
import gameboard from "../Gameboard Object/gameboardObject";

const player = (name) => {
  const getName = () => name;
  const ships = [
    ship(5, "Carrier"),
    ship(4, "Battleship"),
    ship(3, "Destroyer"),
    ship(3, "Submarine"),
    ship(2, "Patrol Boat")
  ];
  const gameboardObject = gameboard();

  gameboardObject.createGameboard();
  const playersGameboard = gameboardObject.getGameBoardArray();

  const attack = (cordinates) => cordinates;

  return { getName, ships, playersGameboard, attack };
};

export default player;
