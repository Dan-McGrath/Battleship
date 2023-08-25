import player from "../Player Object/playerObject";

const gameManager = () => {
  const player1 = player("Player 1");
  const player2 = player("Player 2");

  let currentPlayer = player1;
  let enemyPlayer = player2;

  const getPlayer1 = () => player1;

  const getPlayer2 = () => player2;

  const getCurrentPlayer = () => currentPlayer;

  const getEnemyPlayer = () => enemyPlayer;

  const changeCurrentPlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      enemyPlayer = player1;
      return currentPlayer;
    }
    currentPlayer = player1;
    enemyPlayer = player2;
    return currentPlayer;
  };

  return {
    getCurrentPlayer,
    changeCurrentPlayer,
    getEnemyPlayer,
    getPlayer1,
    getPlayer2
  };
};

export default gameManager;
