import gameManager from "../GameManager/gameManager";

const content = document.querySelector(".content");
const GameManager = gameManager();
const DomManager = () => {
  const getMainDiv = () => content;

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

  const playerStartBtnHandler = (e) => {
    if (e.target.dataset.active === "false") {
      e.target.dataset.active = "true";
    }
  };

  const playerStartBtn = () => {
    const playerStart = document.createElement("button");
    playerStart.classList.add("player-start");
    playerStart.textContent = `${GameManager.player1.getName()} Start!`;
    playerStart.dataset.active = false;
    content.appendChild(playerStart);
  };

  const playerGameboard = () => {
    const gameboard = gameManager().player1.playersGameboard; // Change to switch gameboard based on whose turn it is
    const gameboardDiv = document.createElement("div");
    gameboardDiv.classList.add("gameboard");

    content.appendChild(gameboardDiv);

    gameboard.forEach((ele) => {
      const square = ele;
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
      squareDiv.textContent = square.cord;
      gameboardDiv.appendChild(squareDiv);
    });
  };

  const displayGame = () => {
    displayHeader();
    displayTitle();
    playerGameboard();
    playerStartBtn();
    const playerStart = document.querySelector(".player-start");
    playerStart.addEventListener("click", playerStartBtnHandler());
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
