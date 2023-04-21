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
    } else if (countO < countX) {
      event.target.textContent = playerO;
    } else if (countX === countO) {
      event.target.textContent = playerX;
    }

    countO = 0;
    countX = 0;
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
