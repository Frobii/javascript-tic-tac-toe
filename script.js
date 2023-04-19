const gameboard = (() => {
  const grid = Array.from(Array(3), () => new Array(3));
  grid[0][2] = 'X';
  grid[1][1] = 'O';
  grid[2][0] = 'X';

  return { grid };
})();

const displayController = (() => {
  const positions = [];

  for (let i = 0; i < 9; i += 1) {
    positions.push(document.querySelector(`.pos-${i}`));
  }

  function populateDisplay(board) {
    for (let i = 0; i < positions.length; i += 1) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      positions[i].textContent = board[row][col];
    }
  }

  return { positions, populateDisplay };
})();

displayController.populateDisplay(gameboard.grid);
