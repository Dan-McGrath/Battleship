/* eslint-disable no-undef */
import gameboard from "./gameboardObject";
import ship from "../Ship Object/shipObject";

test("should create gameboard with length of 100", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  const gameboardArr = newGameboard.getGameBoardArray();
  expect(gameboardArr.length).toBe(100);
});

test("should create gameboard with a cordinate of [9,9]", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  const gameboardArr = newGameboard.getGameBoardArray();
  const target = [9, 9];
  const result = gameboardArr.pop().cord;
  expect(result).toStrictEqual(target);
});

test("should check if square is occupied", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  const shipCords = [0, 0];
  const shipPlacement = newGameboard.checkCordinates(shipCords);
  expect(shipPlacement).toBe(true);
});

test("should check if ship can be placed horizontaly to the right", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
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
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  const newShip = ship(3);
  const shipCords = [0, 9];
  const shipPlacement = newGameboard.placeShipHorizontalyRight(
    shipCords,
    newShip
  );
  expect(shipPlacement).toBe(false);
});

test("should check if ship can be placed horizontaly to the left", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
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
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  const newShip = ship(3);
  const shipCords = [0, 0];
  const shipPlacement = newGameboard.placeShipHorizontalyLeft(
    shipCords,
    newShip
  );
  expect(shipPlacement).toBe(false);
});

test("should check if ship can be placed vertically up", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
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
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  const newShip = ship(3);
  const shipCords = [0, 0];
  const shipPlacement = newGameboard.placeShipVerticalyUp(shipCords, newShip);
  expect(shipPlacement).toBe(false);
});

test("should check if ship can be place vertically down", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
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
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  const newShip = ship(3);
  const shipCords = [9, 0];
  const shipPlacement = newGameboard.placeShipVerticalyDown(shipCords, newShip);
  expect(shipPlacement).toStrictEqual(false);
});

test("should return true if ship has been placed", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
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
  const newGameboard = gameboard();
  newGameboard.createGameboard();
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
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  const ship1 = ship(3, "ship1");
  const ship1Cordinates = [0, 0];

  const placeShip1 = newGameboard.placeShip(
    newGameboard.placeShipHorizontalyRight,
    ship1,
    ship1Cordinates
  );

  if (placeShip1) {
    newGameboard.addShipLocation(placeShip1, ship1);
  }
  expect(newGameboard.receiveAttack([0, 0])).toBeInstanceOf(Object);
});

test("should return false if space has already been attacked", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  newGameboard.receiveAttack([0, 0]);

  expect(newGameboard.receiveAttack([0, 0])).toBe(false);
});

test("should return arr of missed shots if ship is not at location", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  expect(newGameboard.receiveAttack([0, 0])).toBeInstanceOf(Array);
});

test("should return true if all ships are sunk", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  const ship1 = ship(2);
  const ship1Cordinates = [0, 0];

  const placeShip1 = newGameboard.placeShip(
    newGameboard.placeShipHorizontalyRight,
    ship1,
    ship1Cordinates
  );

  if (placeShip1) {
    newGameboard.addShipLocation(placeShip1, ship1);
  }

  newGameboard.receiveAttack([0, 0]);
  newGameboard.receiveAttack([0, 1]);

  expect(newGameboard.allShipsSunk()).toBe(true);
});

test("should return false if all ships are not sunk", () => {
  const newGameboard = gameboard();
  newGameboard.createGameboard();
  const ship1 = ship(1, "ship1");
  const ship2 = ship(3, "ship2");
  const ship1Cordinates = [0, 0];
  const ship2Cordinates = [4, 0];
  const placeShip1 = newGameboard.placeShip(
    newGameboard.placeShipHorizontalyRight,
    ship1,
    ship1Cordinates
  );

  const ship2Placement = newGameboard.placeShip(
    newGameboard.placeShipHorizontalyRight,
    ship2,
    ship2Cordinates
  );

  if (placeShip1) {
    newGameboard.addShipLocation(placeShip1, ship1);
  }

  if (ship2Placement) {
    newGameboard.addShipLocation(ship2Placement, ship2);
  }

  newGameboard.receiveAttack([0, 0]);
  expect(newGameboard.allShipsSunk()).toBe(false);
});
