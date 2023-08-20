import gameboard from "./gameboardObject";
import ship from "../Ship Object/shipObject";

const newGameboard = gameboard();
newGameboard.createGameboard();
const gameboardArr = newGameboard.getGameBoardArray();

test("should create gameboard with length of 100", () => {
  expect(gameboardArr.length).toBe(100);
});

test("should create gameboard with a cordinate of [9,9]", () => {
  const target = [9, 9];
  const result = gameboardArr.pop().cord;
  expect(result).toStrictEqual(target);
});

test("should place ship at cord [0, 0]", () => {
  const newShip = ship(3);
  const shipCords = [0, 0];
  const shipPlacement = newGameboard.placeShip(shipCords, newShip);
  expect(shipPlacement).toBe(true);
});
