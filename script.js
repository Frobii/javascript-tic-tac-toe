const player = () => {
  const O = 'O';
  const X = 'X';

  return {
    O,
    X,
  };
};

const playerO = player().O;
const playerX = player().X;

const gameLogic = () => {
  const boardCover = document.querySelector('.board-cover');
  const confetti = document.querySelector('.confetti');
  const playerInfo = document.querySelector('.player-info');
  const resultScreen = document.querySelector('.result-screen');
  const tieScreen = document.querySelector('.tie-screen');
  const xName = document.getElementById('x-name');
  const oName = document.getElementById('o-name');

  function swapResultScreen() {
    resultScreen.style.display = 'flex';
    playerInfo.style.display = 'none';
  }

  function swapTieScreen() {
    tieScreen.style.display = 'flex';
    playerInfo.style.display = 'none';
  }

  function swapInfoScreen() {
    tieScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    playerInfo.style.display = 'flex';
    resultScreen.textContent = '';
  }

  function checkWinner() {
    const positions = gameboard.domPositions;

    // Check rows for a win
    for (let i = 0; i < 9; i += 3) {
      if (
        positions[i].textContent !== '' &&
        positions[i].textContent === positions[i + 1].textContent &&
        positions[i].textContent === positions[i + 2].textContent
      ) {
        return true;
      }
    }

    // Check columns for a win
    for (let i = 0; i < 3; i += 1) {
      if (
        positions[i].textContent !== '' &&
        positions[i].textContent === positions[i + 3].textContent &&
        positions[i].textContent === positions[i + 6].textContent
      ) {
        return true;
      }
    }

    // Check diagonals for a win
    if (
      positions[0].textContent !== '' &&
      positions[0].textContent === positions[4].textContent &&
      positions[0].textContent === positions[8].textContent
    ) {
      return true;
    }

    if (
      positions[2].textContent !== '' &&
      positions[2].textContent === positions[4].textContent &&
      positions[2].textContent === positions[6].textContent
    ) {
      return true;
    }

    // No winner found
    return false;
  }

  function makeMove(event) {
    let countO = 0;
    let countX = 0;

    for (let i = 0; i < 9; i += 1) {
      if (gameboard.domPositions[i].textContent === 'O') {
        countO += 1;
      } else if (gameboard.domPositions[i].textContent === 'X') {
        countX += 1;
      }
    }

    if (event.target.textContent !== '') {
      // change the color of the text to red for a second?
    } else if (countO === 0 && countX === 0) {
      // X always goes first
      event.target.textContent = playerX;
      countX += 1;
    } else if (countO < countX) {
      event.target.textContent = playerO;
      countO += 1;
    } else if (countX === countO) {
      event.target.textContent = playerX;
      countX += 1;
    }

    if (checkWinner() && countX > countO) {
      resultScreen.textContent = `${xName.value} won!!!`;
      boardCover.style.zIndex = '2';
      confetti.style.display = 'inline';
      swapResultScreen();
    } else if (checkWinner() && countO === countX) {
      resultScreen.textContent = `${oName.value} won!!!`;
      boardCover.style.zIndex = '2';
      confetti.style.display = 'inline';
      swapResultScreen();
    } else if (countX === 5) {
      tieScreen.textContent = `It's a tie!`;
      boardCover.style.zIndex = '2';
      swapTieScreen();
    }

    countX = 0;
    countO = 0;
  }

  return {
    makeMove,
    swapInfoScreen,
    boardCover,
    confetti,
  };
};

const gameboard = (() => {
  const domPositions = [];
  const resetButton = document.querySelector('.reset-button');
  const swapButton = document.querySelector('.swap-button');
  const xName = document.getElementById('x-name');
  const oName = document.getElementById('o-name');

  for (let i = 0; i < 9; i += 1) {
    domPositions.push(document.querySelector(`.pos-${i}`));
    domPositions[i].addEventListener('click', gameLogic().makeMove);
  }

  function swapNames() {
    let placeHolder = '';
    placeHolder = xName.value;
    xName.value = oName.value;
    oName.value = placeHolder;
  }

  function resetBoard() {
    for (let i = 0; i < 9; i += 1) {
      domPositions[i].textContent = '';
    }
  }

  swapButton.addEventListener('click', () => {
    swapNames();
  });

  resetButton.addEventListener('click', () => {
    resetBoard();
    gameLogic().boardCover.style.zIndex = '1';
    gameLogic().confetti.style.display = 'none';
    gameLogic().swapInfoScreen();
  });

  return { domPositions };
})();
