import player from "../Player Object/playerObject";

const gameManager = () => {
  const player1 = player("Player 1");
  const player2 = player("Player 2");

  const currentPlayer = player1;

  const player1Ships = player1.ships;
  const player2Ships = player2.ships;

  const placeShips = () => {};

  return { currentPlayer };
};

export default gameManager;
