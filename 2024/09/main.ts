import { data } from "./data.ts";

const testData = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const dataToArray = (data: string) => {
  return data.split("\n").map((val) => val.split("").map(Number));
};

let array = dataToArray(testData);

type Position = [number, number];

const isValidMove = (
  x: number,
  y: number,
  prevValue: number,
  visited: Set<string>
): boolean => {
  return (
    x >= 0 &&
    y >= 0 &&
    x < array.length &&
    y < array[0].length &&
    array[x][y] < prevValue &&
    !visited.has(`${x},${y}`)
  );
};

const getTotalValidTrails = (
  x: number,
  y: number,
  visited: Set<string> = new Set<string>()
): number => {
  const currentValue = array[x][y];

  // If we reach a 0, count this as one valid path.
  if (currentValue === 0) return 1;

  visited.add(`${x},${y}`);
  let totalPaths = 0;

  // Explore neighbors: up, down, left, right.
  const neighbors: Position[] = [
    [x - 1, y], // Up
    [x + 1, y], // Down
    [x, y - 1], // Left
    [x, y + 1], // Right
  ];

  for (const [nx, ny] of neighbors) {
    if (isValidMove(nx, ny, currentValue, visited)) {
      // Continue traversing and accumulate paths that lead to a 0.
      totalPaths += getTotalValidTrails(nx, ny, new Set(visited));
    }
  }

  return totalPaths;
};

const part1 = () => {
  const endOfTrail = {};
  const END_NB_TRAIL = 9;

  // 1. get position of every end of trails
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      const number = array[i][j];

      if (number === END_NB_TRAIL) {
        endOfTrail[`${i},${j}`] = 0;
      }
    }
  }

  // 2. check how many time you can go to 0 from the trail head
  Object.keys(endOfTrail).forEach((trail) => {
    const [x, y] = trail.split(",").map(Number);
    endOfTrail[trail] = getTotalValidTrails(x, y);
  });

  console.log(endOfTrail);

  // 3. return the total
};
const part2 = () => {};

part1();
part2();
