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

  const attack = (cordinates) => cordinates;

  return { getName, ships, playersGameboard, attack, gameboardObject };
};

export default player;
