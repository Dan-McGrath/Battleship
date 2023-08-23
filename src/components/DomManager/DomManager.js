import gameManager from "../GameManager/gameManager";

const content = document.querySelector(".content");
const GameManager = gameManager();
const DomManager = () => {
  const getMainDiv = () => content;
  const player = GameManager.currentPlayer;
  const reset = () => {
    while (content.hasChildNodes()) {
      content.removeChild(content.firstChild);
    }
  };

  const displayHeader = () => {
    const header = document.createElement("header");
    getMainDiv().appendChild(header);
  };

  const displayTitle = () => {
    const title = document.createElement("h1");
    title.textContent = "Battleship";
    content.appendChild(title);
  };

  const displayPlayerShips = () => {
    const shipDiv = document.createElement("div");
    shipDiv.classList.add("ships");
    const monitor = document.querySelector(".monitor");
    monitor.appendChild(shipDiv);
    player.ships.forEach((ele) => {
      const ship = document.createElement("div");
      ship.classList.add("ship");
      ship.dataset.active = false;
      ship.dataset.index = player.ships.indexOf(ele);

      const shipName = document.createElement("h3");
      shipName.textContent = `${ele.ship.getName()}`;

      const shipSize = document.createElement("p");
      shipSize.textContent = `Size = ${ele.ship.getLength()}`;

      shipDiv.appendChild(ship);
      ship.appendChild(shipName);
      ship.appendChild(shipSize);
    });
  };

  const pickShipHandler = (e) => {
    const ship = e.currentTarget;
    e.stopPropagation();
    const ships = document.querySelectorAll(".ship");
    ships.forEach((ele) => {
      if (ele.dataset.active === "true") {
        ele.dataset.active = "false";
      }
    });
    if (ship.dataset.active === "false") {
      ship.dataset.active = "true";
      return player.selectShip(ship.dataset.index);
    }

    ship.dataset.active = "false";
    return false;
  };

  const playerStartBtnHandler = (e) => {
    const gameboard = document.querySelector(".gameboard");
    if (e.target.dataset.active === "false") {
      gameboard.classList.remove("hidden");
      e.target.dataset.active = "true";
      const ships = document.querySelectorAll(".ship");
      ships.forEach((ele) => {
        ele.addEventListener("click", pickShipHandler);
      });
    }
  };

  const directionControls = () => {
    const controller = document.createElement("div");
    controller.classList.add("controller");

    const controlDiv = document.createElement("div");
    controlDiv.classList.add("controls");

    const subtitle = document.createElement("h2");
    subtitle.textContent = "Select orientation of ship";

    controller.appendChild(subtitle);

    const upBtn = document.createElement("button");
    upBtn.textContent = "Up";
    upBtn.classList.add("up");
    const downBtn = document.createElement("button");
    downBtn.textContent = "Down";
    downBtn.classList.add("down");
    const rightBtn = document.createElement("button");
    rightBtn.textContent = "Right";
    rightBtn.classList.add("right");
    const leftBtn = document.createElement("button");
    leftBtn.textContent = "Left";
    leftBtn.classList.add("left");

    const monitor = document.querySelector(".monitor");
    monitor.appendChild(controller);
    controller.appendChild(controlDiv);
    controlDiv.appendChild(upBtn);
    controlDiv.appendChild(downBtn);
    controlDiv.appendChild(rightBtn);
    controlDiv.appendChild(leftBtn);
  };

  const playerStartBtn = () => {
    const playerStart = document.createElement("button");
    playerStart.classList.add("player-start");
    playerStart.textContent = `${player.getName()} Start!`;
    playerStart.dataset.active = "false";
    content.appendChild(playerStart);
  };

  const playerGameboard = () => {
    const gameboard = player.playersGameboard;
    const gameboardDiv = document.createElement("div");
    const monitor = document.querySelector(".monitor");
    gameboardDiv.classList.add("gameboard");
    gameboardDiv.classList.add("hidden");

    gameboard.forEach((ele) => {
      const square = ele;
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
      squareDiv.textContent = square.cord;
      gameboardDiv.appendChild(squareDiv);
    });
    monitor.appendChild(gameboardDiv);
  };

  const playerMonitor = () => {
    const monitor = document.createElement("div");
    monitor.classList.add("monitor");
    content.appendChild(monitor);
    playerGameboard();
    displayPlayerShips();
    directionControls();
  };

  const displayDefaultGame = () => {
    displayHeader();
    displayTitle();
    playerMonitor();
    playerStartBtn();
    const playerStart = document.querySelector(".player-start");
    playerStart.addEventListener("click", playerStartBtnHandler);
  };

  const dsplayStartButton = () => {
    const startBtn = document.createElement("button");
    startBtn.classList.add("start");
    startBtn.textContent = "Start";

    startBtn.dataset.active = false;

    content.appendChild(startBtn);
  };

  const startBtnHandler = (e) => {
    const btn = e.target;
    if (btn.dataset.active === "false") {
      btn.dataset.active = "true";
      reset();
      displayDefaultGame();
    }
  };

  const displayHome = () => {
    displayHeader();
    displayTitle();
    dsplayStartButton();
    const startBtn = document.querySelector(".start");
    startBtn.addEventListener("click", startBtnHandler);
  };

  return {
    displayHome
  };
};

export default DomManager;
