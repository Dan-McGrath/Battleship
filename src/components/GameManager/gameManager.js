import player from "../Player Object/playerObject";

const gameManager = () => {
  const player1 = player("Player 1");
  const player2 = player("Player 2");

  let currentPlayer = player1;

  const player1Ships = player1.ships;
  const player2Ships = player2.ships;

  const changeCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    }
    currentPlayer = player2;
    return currentPlayer;
  };

  const getCurrentPlayer = () => currentPlayer;

  return { getCurrentPlayer, changeCurrentPlayer };
};

export default gameManager;
