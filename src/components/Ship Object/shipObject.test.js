import ship from "./shipObject";

test("Ship gets hit", () => {
  const newShip = ship(2);
  expect(newShip.hit()).toBe(1);
});

test("Ship is not sunk", () => {
  const newShip = ship(2);
  newShip.hit();
  expect(newShip.isSunk()).toBe(false);
});

test("Ship is sunk", () => {
  const newShip = ship(2);
  newShip.hit();
  newShip.hit();
  expect(newShip.isSunk()).toBe(true);
});
