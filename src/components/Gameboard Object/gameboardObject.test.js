import gameboard from "./gameboardObject";

test("should create gameboard with length of 100", () => {
  const newGameboard = gameboard();
  expect(newGameboard.length).toBe(100);
});

test("should create gameboard with a cordinate of [5,8]", () => {
  const newGameboard = gameboard();
  const target = [5, 8];
  const result = newGameboard.forEach((ele) =>
    ele.cord.every((element) => target.includes(element))
  );
  expect(result).toBe(true);
});
