const gameboard = (() => {
  const gamePositons = Array.from(Array(3), () => new Array(3));

  const domPositions = [];
  for (let i = 0; i < 9; i += 1) {
    domPositions.push(document.querySelector(`.pos-${i}`));
  }

  gamePositons[0][2] = 'X';
  gamePositons[1][1] = 'O';
  gamePositons[2][0] = 'X';

  return { gamePositons, domPositions };
})();

const displayController = (() => {
  function populateDisplay(boardArray, domArray) {
    for (let i = 0; i < domArray.length; i += 1) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      domArray[i].textContent = boardArray[row][col];
    }
  }

  return { populateDisplay };
})();

const createPlayer = (playerSymbol) => {
  const symbol = playerSymbol;

  return {
    symbol,
  };
};

const playerOne = createPlayer('O');
const playerTwo = createPlayer('X');

displayController.populateDisplay(
  gameboard.gamePositons,
  gameboard.domPositions
);
