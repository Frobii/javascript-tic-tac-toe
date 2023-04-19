const gameboard = (() => {
  const grid = Array.from(Array(3), () => new Array(3));

  return { grid };
})();

const displayController = (() => {
  const positions = [];

  for (let i = 0; i < 9; i += 1) {
    positions.push(document.querySelector(`.pos-${i}`));
  }

  return { positions };
})();

console.log(gameboard.grid);
console.log(displayController.positions);
