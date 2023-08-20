import ship from "../Ship Object/shipObject";

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

  const placeShip = (cordinate) => {
    const board = getGameBoardArray();
    let square;
    for (let i = 0; i < board.length; i++) {
      if (JSON.stringify(board[i].cord) === JSON.stringify(cordinate)) {
        square = board[i];
        if (square.isOccupied === false);
        square.isOccupied = true;
        return square;
      }
    }
    return square;
  };

  return { createGameboard, getGameBoardArray, placeShip };
};

export default gameboard;
