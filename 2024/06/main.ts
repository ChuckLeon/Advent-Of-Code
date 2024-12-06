import { data } from "./data.ts";

const testData = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const EMPTY_ELEMENT = ".";

const directions = ["^", "v", ">", "<"];

const dataToArray = (data: string) => {
  return data.split("\n").map((val) => val.split(""));
};

const lab = dataToArray(data);

const addIfNotInArray = (source: any[], target: any[]) => {
  if (!source.some((arr) => JSON.stringify(arr) === JSON.stringify(target))) {
    source.push(target);
  }
};

const part1 = () => {
  let guardPosition: number[] = [];
  const visitedTiles: number[][] = [];
  let currentDirection = "";
  let searching: boolean = true;

  // 1. find the guard
  for (const [i, row] of lab.entries()) {
    for (const [j, tile] of row.entries()) {
      if (directions.includes(tile)) {
        guardPosition = [i, j];
        currentDirection = tile;
        visitedTiles.push(guardPosition);
      }
    }
  }

  while (searching) {
    // todo: add check in else ifs to check if we are still inside the array

    // 2. move the guard out
    switch (currentDirection) {
      case "^":
        if (guardPosition[0] - 1 < 0) {
          searching = false;
          break;
        }

        if (lab[guardPosition[0] - 1][guardPosition[1]] === EMPTY_ELEMENT) {
          lab[guardPosition[0]][guardPosition[1]] = EMPTY_ELEMENT;
          lab[guardPosition[0] - 1][guardPosition[1]] = currentDirection;
          addIfNotInArray(visitedTiles, [[guardPosition[0], guardPosition[1]]]);

          guardPosition = [guardPosition[0] - 1, guardPosition[1]];
        } else {
          // turn right
          currentDirection = ">";
        }
        break;
      case ">":
        if (guardPosition[1] + 1 > lab[0].length - 1) {
          searching = false;
          break;
        }

        if (lab[guardPosition[0]][guardPosition[1] + 1] === EMPTY_ELEMENT) {
          lab[guardPosition[0]][guardPosition[1]] = EMPTY_ELEMENT;
          lab[guardPosition[0]][guardPosition[1] + 1] = currentDirection;
          addIfNotInArray(visitedTiles, [[guardPosition[0], guardPosition[1]]]);

          guardPosition = [guardPosition[0], guardPosition[1] + 1];
        } else {
          // turn right
          currentDirection = "v";
        }
        break;
      case "v":
        if (guardPosition[0] + 1 > lab.length - 1) {
          searching = false;
          break;
        }

        if (lab[guardPosition[0] + 1][guardPosition[1]] === EMPTY_ELEMENT) {
          lab[guardPosition[0]][guardPosition[1]] = EMPTY_ELEMENT;
          lab[guardPosition[0] + 1][guardPosition[1]] = currentDirection;
          addIfNotInArray(visitedTiles, [[guardPosition[0], guardPosition[1]]]);

          guardPosition = [guardPosition[0] + 1, guardPosition[1]];
        } else {
          // turn right
          currentDirection = "<";
        }
        break;
      case "<":
        if (guardPosition[1] - 1 < 0) {
          searching = false;
          break;
        }

        if (lab[guardPosition[0]][guardPosition[1] - 1] === EMPTY_ELEMENT) {
          lab[guardPosition[0]][guardPosition[1]] = EMPTY_ELEMENT;
          lab[guardPosition[0]][guardPosition[1] - 1] = currentDirection;
          addIfNotInArray(visitedTiles, [[guardPosition[0], guardPosition[1]]]);

          guardPosition = [guardPosition[0], guardPosition[1] - 1];
        } else {
          // turn right
          currentDirection = "^";
        }
        break;
      default:
        break;
    }
  }

  console.log(visitedTiles.length);
};

const part2 = () => {};

part1();
// part2();
