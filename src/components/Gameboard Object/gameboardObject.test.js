/* eslint-disable no-undef */
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
  const target = [
    [0, 0],
    [0, 1],
    [0, 2]
  ];
  const shipPlacement = newGameboard.placeShipHorizontalyRight(
    shipCords,
    newShip
  );
  expect(shipPlacement).toStrictEqual(target);
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
  const target = [
    [0, 2],
    [0, 3],
    [0, 4]
  ];
  const shipPlacement = newGameboard.placeShipHorizontalyLeft(
    shipCords,
    newShip
  );
  expect(shipPlacement).toStrictEqual(target);
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
  const target = [
    [1, 0],
    [2, 0],
    [3, 0]
  ];
  const shipPlacement = newGameboard.placeShipVerticalyUp(shipCords, newShip);
  expect(shipPlacement).toStrictEqual(target);
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
  const target = [
    [0, 0],
    [1, 0],
    [2, 0]
  ];
  const shipPlacement = newGameboard.placeShipVerticalyDown(shipCords, newShip);
  expect(shipPlacement).toStrictEqual(target);
});

test("should return false if ship can not be placed vertically down", () => {
  const newShip = ship(3);
  const shipCords = [9, 0];
  const shipPlacement = newGameboard.placeShipVerticalyDown(shipCords, newShip);
  expect(shipPlacement).toStrictEqual(false);
});

test("should return true if ship has been placed", () => {
  const newShip = ship(4);
  const shipCordinates = [4, 5];
  const target = [
    [4, 5],
    [5, 5],
    [6, 5],
    [7, 5]
  ];
  const shipPlacement = newGameboard.placeShip(
    newGameboard.placeShipVerticalyDown,
    newShip,
    shipCordinates
  );
  expect(shipPlacement).toStrictEqual(target);
});

test("should return false if ship can not be placed", () => {
  const ship1 = ship(4);
  const ship2 = ship(5);

  const ship1Cordinates = [4, 5];
  const ship2Cordinates = [7, 2];
  newGameboard.placeShip(
    newGameboard.placeShipVerticalyDown,
    ship1,
    ship1Cordinates
  );
  const ship2Placement = newGameboard.placeShip(
    newGameboard.placeShipHorizontalyRight,
    ship2,
    ship2Cordinates
  );
  expect(ship2Placement).toBe(false);
});

test("should return object of ship attacked", () => {
  const ship1 = ship(3, "ship1");
  const ship2 = ship(5, "ship2");
  const ship3 = ship(7, "ship3");
  const ship1Cordinates = [0, 0];
  const ship2Cordinates = [9, 0];
  const ship3Cordinates = [0, 9];

  const placeShip1 = newGameboard.placeShip(
    newGameboard.placeShipHorizontalyRight,
    ship1,
    ship1Cordinates
  );
  const placeShip2 = newGameboard.placeShip(
    newGameboard.placeShipVerticalyUp,
    ship2,
    ship2Cordinates
  );
  const placeShip3 = newGameboard.placeShip(
    newGameboard.placeShipVerticalyDown,
    ship3,
    ship3Cordinates
  );

  if (placeShip1) {
    newGameboard.addShipLocation(placeShip1, ship1);
  }
  if (placeShip2) {
    newGameboard.addShipLocation(placeShip2, ship2);
  }
  if (placeShip3) {
    newGameboard.addShipLocation(placeShip3, ship3);
  }

  expect(newGameboard.receiveAttack([3, 9])).toBeInstanceOf(Object);
});
