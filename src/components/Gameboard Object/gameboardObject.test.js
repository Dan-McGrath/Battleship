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

test("should check if square is occupied", () => {
  const shipCords = [0, 0];
  const shipPlacement = newGameboard.checkCordinates(shipCords);
  expect(shipPlacement).toBe(true);
});

test("should check if ship can be placed horizontaly to the right", () => {
  const newShip = ship(3);
  const shipCords = [0, 0];
  const shipPlacement = newGameboard.placeShipHorizontalyRight(
    shipCords,
    newShip
  );
  expect(shipPlacement).toBe(true);
});

test("should return false if ship cannot be placed horizontaly to the right", () => {
  const newShip = ship(3);
  const shipCords = [0, 9];
  const shipPlacement = newGameboard.placeShipHorizontalyRight(
    shipCords,
    newShip
  );
  expect(shipPlacement).toBe(false);
});

test("should check if ship can be placed horizontaly to the left", () => {
  const newShip = ship(3);
  const shipCords = [0, 4];
  const shipPlacement = newGameboard.placeShipHorizontalyLeft(
    shipCords,
    newShip
  );
  expect(shipPlacement).toBe(true);
});

test("should return false if ship can not be palced horizontally to the left", () => {
  const newShip = ship(3);
  const shipCords = [0, 0];
  const shipPlacement = newGameboard.placeShipHorizontalyLeft(
    shipCords,
    newShip
  );
  expect(shipPlacement).toBe(false);
});

test("should check if ship can be placed vertically up", () => {
  const newShip = ship(3);
  const shipCords = [3, 0];
  const shipPlacement = newGameboard.placeShipVerticalyUp(shipCords, newShip);
  expect(shipPlacement).toBe(true);
});

test("should return false if ship can not be placed vertically up", () => {
  const newShip = ship(3);
  const shipCords = [0, 0];
  const shipPlacement = newGameboard.placeShipVerticalyUp(shipCords, newShip);
  expect(shipPlacement).toBe(false);
});

test("should check if ship can be place vertically down", () => {
  const newShip = ship(3);
  const shipCords = [0, 0];
  const shipPlacement = newGameboard.placeShipVerticalyDown(shipCords, newShip);
  expect(shipPlacement).toBe(true);
});

test("should return false if ship can not be placed vertically down", () => {
  const newShip = ship(3);
  const shipCords = [9, 0];
  const shipPlacement = newGameboard.placeShipVerticalyDown(shipCords, newShip);
  expect(shipPlacement).toBe(false);
});
