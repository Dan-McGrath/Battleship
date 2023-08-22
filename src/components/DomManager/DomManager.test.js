/**
 * @jest-environment jsdom
 */

import DomManager from "./DomManager";

test("should ", () => {
  const dom = DomManager();
  const display = dom.displayHome();
  console.log(display);
});
