/* eslint-disable no-undef */
import player from "./playerObject";

test("should return player object", () => {
  const player1 = player("Dan");
  expect(player1).toBeInstanceOf(Object);
});

test("should return ships objects", () => {
  const player1 = player("Dan");
  expect(player1.ships).toBe(true);
});
