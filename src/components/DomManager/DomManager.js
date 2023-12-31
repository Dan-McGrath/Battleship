import gameManager from "../GameManager/gameManager";
import gameboard from "../Gameboard Object/gameboardObject";

const content = document.querySelector(".content");
const GameManager = gameManager();
const DomManager = () => {
  const getMainDiv = () => content;
  let player = GameManager.getCurrentPlayer();

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

  const placeShipHandler = (e) => {
    const placeShip = e.currentTarget;
    const ships = document.querySelectorAll(".ship");
    const squares = document.querySelectorAll(".square");
    const directions = document.querySelectorAll(".direction");

    const getShipIndex = () => {
      let index;
      ships.forEach((ele) => {
        if (ele.dataset.active === "true") {
          index = ele.dataset.index;
          return index;
        }
        return false;
      });
      return index;
    };

    const getSquareIndex = () => {
      let index;
      squares.forEach((ele) => {
        if (ele.dataset.active === "true") {
          index = ele.dataset.index;
          return index;
        }
        return false;
      });
      return index;
    };

    const getDirection = () => {
      let direction;
      directions.forEach((ele) => {
        if (ele.dataset.active === "true") {
          direction = ele.id;
          return direction;
        }
        return false;
      });
      return direction;
    };

    const cordinatesSelected = getSquareIndex();
    const shipSelected = getShipIndex();
    const directionChosen = getDirection();

    if (cordinatesSelected && shipSelected && directionChosen) {
      const shipCordinates = player.placeShip(
        shipSelected,
        directionChosen,
        cordinatesSelected
      );
      const shipLocation = player.gameboardObject.addShipLocation(
        shipCordinates,
        player.ships[shipSelected]
      );
      if (shipLocation.shipCordinates === false) {
        alert("ship cannot be placed here");
      }
      player.ships[shipSelected].placed = true;
      reset();
      currentPlayerPickShipLocation();
    }
  };

  const displayPlayerShips = () => {
    const shipsDiv = document.createElement("div");
    shipsDiv.classList.add("ships");
    const monitor = document.querySelector(".monitor");
    monitor.appendChild(shipsDiv);
    player.ships.forEach((ele) => {
      const shipDiv = document.createElement("div");
      shipDiv.classList.add("ship");
      shipDiv.dataset.active = false;
      shipDiv.dataset.index = player.ships.indexOf(ele);
      shipDiv.dataset.numberOfHits = ele.ship.getNumberofHits();
      shipDiv.dataset.isSunk = ele.ship.isSunk();

      const shipName = document.createElement("h3");
      shipName.textContent = `${ele.ship.getName()}`;

      const shipSize = document.createElement("p");
      shipSize.textContent = `Size = ${ele.ship.getLength()}`;

      const placeShipbtn = document.createElement("button");
      placeShipbtn.textContent = "Place Ship!";
      placeShipbtn.dataset.active = "true";
      placeShipbtn.classList.add("hidden");
      placeShipbtn.classList.add("place-ship");

      shipsDiv.appendChild(shipDiv);
      shipDiv.appendChild(shipName);
      shipDiv.appendChild(shipSize);
      shipDiv.appendChild(placeShipbtn);
    });
  };

  const nextTurnHandler = () => {
    reset();
    player = GameManager.changeCurrentPlayer();
    displayGame();
  };

  const nextTurnBtn = () => {
    const sideBtnDiv = document.querySelector(".side-btns");
    const nextTurn = document.createElement("button");
    nextTurn.classList.add("next-turn");
    nextTurn.textContent = "End Turn";

    sideBtnDiv.appendChild(nextTurn);
  };

  const attackBtnHandler = (e) => {
    const square = document.querySelectorAll(".square");
    const gameboardToAttack = player.blankGameboard;
    const enemyPlayer = GameManager.getEnemyPlayer();
    const enemyBoardToAttack = GameManager.getEnemyPlayer().playersGameboard;
    const playersBoard = player.playersGameboard;
    let cordinatSelected;
    const enemyShips = enemyPlayer.ships;
    for (let i = 0; i < gameboardToAttack.length; i++) {
      if (
        square[i].dataset.active === "true" &&
        gameboardToAttack[i].isAttacked === false
      ) {
        enemyPlayer.gameboardObject.checkIfMissed(enemyBoardToAttack[i].cord);
        cordinatSelected = gameboardToAttack[i];
        enemyPlayer.gameboardObject.receiveAttack(enemyBoardToAttack[i].cord);
        player.attack(cordinatSelected.cord);

        const missed = enemyPlayer.gameboardObject.getMissedAttacks();

        missed.forEach((ele) => {
          if (
            JSON.stringify(gameboardToAttack[i].cord) === JSON.stringify(ele)
          ) {
            gameboardToAttack[i].isMissed = true;
          }
        });

        reset();
        displayGame();

        const attack = document.querySelector(".attack-btn");
        const nextTurn = document.querySelector(".next-turn");
        nextTurn.addEventListener("click", nextTurnHandler);
        attack.removeEventListener("click", attackBtnHandler);

        if (enemyPlayer.gameboardObject.getShipLocations().length === 0) {
          reset();
          displayHome();
        }
      }
    }
  };

  const getAttackBtn = () => {
    const sideBtnDiv = document.querySelector(".side-btns");
    const attackBtn = document.createElement("button");
    attackBtn.classList.add("attack-btn");
    attackBtn.textContent = "Attack!";
    sideBtnDiv.appendChild(attackBtn);
  };

  const displayGame = () => {
    displayHeader();
    displayTitle();
    playerMonitor();
    blankGameBoard();
    displayPlayerShips();
    createSidebtnsDiv();
    getAttackBtn();
    nextTurnBtn();

    const attack = document.querySelector(".attack-btn");
    attack.addEventListener("click", attackBtnHandler);

    const squares = document.querySelectorAll(".square");
    squares.forEach((ele) => {
      ele.addEventListener("click", pickCordinateshandler);
    });
  };

  const endShipPlacementHandler = (e) => {
    const current = e.currentTarget;
    e.stopPropagation();

    const allPlaced = player.ships.every((ele) => ele.placed);

    if (allPlaced === true) {
      if (player.getName() === GameManager.getPlayer1().getName()) {
        reset();
        player = GameManager.changeCurrentPlayer();
        currentPlayerPickShipLocation();
      } else {
        reset();
        player = GameManager.changeCurrentPlayer();
        displayGame();
      }
    }
  };

  const createSidebtnsDiv = () => {
    const monitor = document.querySelector(".monitor");
    const sideBtnDiv = document.createElement("div");
    sideBtnDiv.classList.add("side-btns");
    monitor.appendChild(sideBtnDiv);
  };

  const endShipPlacementBtn = () => {
    const endPlacement = document.createElement("button");
    endPlacement.classList.add("end-placement");
    endPlacement.textContent = "End Turn";
    const monitor = document.querySelector(".monitor");
    const sideBtnDiv = document.querySelector(".side-btns");
    monitor.appendChild(sideBtnDiv);
    sideBtnDiv.appendChild(endPlacement);
  };

  const pickShipHandler = (e) => {
    const ship = e.currentTarget;
    e.stopPropagation();
    const ships = document.querySelectorAll(".ship");
    ships.forEach((ele) => {
      if (ele.dataset.active === "true") {
        ele.dataset.active = "false";
        ele.lastChild.classList.add("hidden");
      }
    });
    if (ship.dataset.active === "false") {
      ship.dataset.active = "true";
      ship.lastChild.classList.remove("hidden");
      return player.selectShip(ship.dataset.index);
    }

    ship.dataset.active = "false";
    return false;
  };

  const blankGameBoard = () => {
    const blankBoard = player.blankGameboard;
    const gameboardDiv = document.createElement("div");
    const monitor = document.querySelector(".monitor");
    gameboardDiv.classList.add("gameboard");

    blankBoard.forEach((ele) => {
      const square = ele;
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
      squareDiv.textContent = square.cord;
      squareDiv.dataset.index = blankBoard.indexOf(ele);
      squareDiv.dataset.isAttacked = square.isAttacked;
      squareDiv.dataset.isOccupied = square.isOccupied;
      squareDiv.dataset.isMissed = square.isMissed;
      squareDiv.dataset.active = "false";

      gameboardDiv.appendChild(squareDiv);
    });
    monitor.appendChild(gameboardDiv);
  };

  const playerGameboard = () => {
    const playersBoard = player.playersGameboard;

    const gameboardDiv = document.createElement("div");
    const monitor = document.querySelector(".monitor");
    gameboardDiv.classList.add("gameboard");

    playersBoard.forEach((ele) => {
      const square = ele;
      const squareDiv = document.createElement("div");
      squareDiv.classList.add("square");
      squareDiv.textContent = square.cord;
      squareDiv.dataset.index = playersBoard.indexOf(ele);
      squareDiv.dataset.isAttacked = square.isAttacked;
      squareDiv.dataset.isOccupied = square.isOccupied;
      squareDiv.dataset.active = "false";

      gameboardDiv.appendChild(squareDiv);
    });
    monitor.appendChild(gameboardDiv);
  };

  const playerMonitor = () => {
    const monitor = document.createElement("div");
    monitor.classList.add("monitor");
    content.appendChild(monitor);
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
    upBtn.classList.add("direction");
    upBtn.setAttribute("id", "up");
    upBtn.dataset.active = "false";

    const downBtn = document.createElement("button");
    downBtn.textContent = "Down";
    downBtn.classList.add("direction");
    downBtn.setAttribute("id", "down");
    downBtn.dataset.active = "false";

    const rightBtn = document.createElement("button");
    rightBtn.textContent = "Right";
    rightBtn.classList.add("direction");
    rightBtn.setAttribute("id", "right");
    rightBtn.dataset.active = "false";

    const leftBtn = document.createElement("button");
    leftBtn.textContent = "Left";
    leftBtn.classList.add("direction");
    leftBtn.setAttribute("id", "left");
    leftBtn.dataset.active = "false";

    const monitor = document.querySelector(".monitor");
    monitor.appendChild(controller);
    controller.appendChild(controlDiv);
    controlDiv.appendChild(upBtn);
    controlDiv.appendChild(downBtn);
    controlDiv.appendChild(rightBtn);
    controlDiv.appendChild(leftBtn);
  };

  const pickCordinateshandler = (e) => {
    const currentSquare = e.currentTarget;
    const squares = document.querySelectorAll(".square");
    squares.forEach((ele) => {
      if (ele.dataset.active === "true") {
        ele.dataset.active = "false";
      }
    });

    if (currentSquare.dataset.active === "false") {
      currentSquare.dataset.active = "true";
    }
  };

  const directionControlsHandler = (e) => {
    const direction = e.currentTarget;
    e.stopPropagation();
    const allDirections = document.querySelectorAll(".direction");
    allDirections.forEach((ele) => {
      if (ele.dataset.active === "true") {
        ele.dataset.active = "false";
      }
    });
    if (direction.dataset.active === "false") {
      direction.dataset.active = "true";
      return player.selectDirection(direction.id);
    }
    direction.dataset.active = "false";
    return false;
  };

  const currentPlayerPickShipLocation = () => {
    displayHeader();
    displayTitle();
    playerMonitor();
    playerGameboard();
    displayPlayerShips();
    directionControls();
    createSidebtnsDiv();
    endShipPlacementBtn();
    const ships = document.querySelectorAll(".ship");
    ships.forEach((ele) => {
      ele.addEventListener("click", pickShipHandler);
    });

    const directions = document.querySelectorAll(".direction");
    directions.forEach((ele) => {
      ele.addEventListener("click", directionControlsHandler);
    });

    const squares = document.querySelectorAll(".square");
    squares.forEach((ele) => {
      ele.addEventListener("click", pickCordinateshandler);
    });

    const placeShipBtns = document.querySelectorAll(".place-ship");
    placeShipBtns.forEach((ele) => {
      ele.addEventListener("click", placeShipHandler);
    });

    const endPlacement = document.querySelector(".end-placement");
    endPlacement.addEventListener("click", endShipPlacementHandler);
  };

  const playerStartBtnHandler = (e) => {
    const gameboardDiv = document.querySelector(".gameboard");
    if (e.target.dataset.active === "false") {
      gameboardDiv.classList.remove("hidden");
      e.target.dataset.active = "true";
      e.target.classList.add("hidden");
      reset();
      currentPlayerPickShipLocation();
    }
  };

  const playerStartBtn = () => {
    const playerStart = document.createElement("button");
    playerStart.classList.add("player-start");
    playerStart.textContent = `${player.getName()} Start!`;
    playerStart.dataset.active = "false";
    content.appendChild(playerStart);
  };

  const displayDefaultGame = () => {
    displayHeader();
    displayTitle();
    playerMonitor();
    playerGameboard();
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
