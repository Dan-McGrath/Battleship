import player from "../Player Object/playerObject";

const gameManager = () => {
  const player1 = player("Player 1");
  const player2 = player("Player 2");

  const player1Ships = player1.ships;
  const player2Ships = player2.ships;
  const start = () => {
    const player1PlaceShips = () => {
      player1Ships.forEach((ele) => {
        while (ele.placed === false) {
          const getShip = (shipIndex) => {
            player1Ships[shipIndex];
          };
          const getDirection = (direction) => {};
          // const getShipCordinate =;
          player1.gameboardObject.placeShip(
            getDirection,
            getShip
            // shipCordinate
          );
        }
      })();
    };
  };
  return { start, player1, player2 };
};

export default gameManager;
