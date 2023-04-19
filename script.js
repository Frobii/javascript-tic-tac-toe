const gameboard = (() => {
  const grid = Array.from(Array(3), () => new Array(3));
  return { grid };
})();

console.log(gameboard.grid);
