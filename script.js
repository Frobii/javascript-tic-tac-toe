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
      alert('X wins!');
    } else if (checkWinner() && countO === countX) {
      alert('O wins!');
    } else if (countX === 5) {
      alert(`It's a tie!`);
    }

    countX = 0;
    countO = 0;
  }

  return {
    makeMove,
  };
};

const gameboard = (() => {
  const domPositions = [];

  for (let i = 0; i < 9; i += 1) {
    domPositions.push(document.querySelector(`.pos-${i}`));
    domPositions[i].addEventListener('click', gameLogic().makeMove);
  }

  return { domPositions };
})();
