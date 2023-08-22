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
      return ship.dataset.index;
    }

    ship.dataset.active = "false";
    return false;
  };

  const playerStartBtnHandler = (e) => {
    if (e.target.dataset.active === "false") {
      e.target.dataset.active = "true";
      const ships = document.querySelectorAll(".ship");
      ships.forEach((ele) => {
        ele.addEventListener("click", pickShipHandler);
      });
    }
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
  };

  const displayGame = () => {
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
      displayGame();
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
