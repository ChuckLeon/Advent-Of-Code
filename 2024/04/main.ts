import { data } from "./data.ts";

const testData = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const MAS = "MAS";
const INVERTED_MAS = "SAM";
const XMAS = "XMAS";
const INVERTED_XMAS = "SAMX";

const dataToArray = (data: string) => {
  return data.split("\n").map((val) => val.split(""));
};

const part1 = (data: string) => {
  let total = 0;
  const dataArr = dataToArray(data);

  for (let i = 0; i < dataArr.length; i++) {
    const line = dataArr[i];
    for (let j = 0; j < line.length; j++) {
      // Check horizontal + flipped
      const horizontal = line.slice(j, j + 4).join("");
      if (horizontal === XMAS || horizontal === INVERTED_XMAS) total++;

      // Check vertical + flipped
      if (i + 3 < dataArr.length) {
        // Ensure vertical indices are within bounds
        const vertical =
          dataArr[i][j] +
          dataArr[i + 1][j] +
          dataArr[i + 2][j] +
          dataArr[i + 3][j];
        if (vertical === XMAS || vertical === INVERTED_XMAS) total++;
      }

      // Check right diagonal + flipped
      if (i + 3 < dataArr.length && j + 3 < line.length) {
        const rightDiagonal =
          dataArr[i][j] +
          dataArr[i + 1][j + 1] +
          dataArr[i + 2][j + 2] +
          dataArr[i + 3][j + 3];
        if (rightDiagonal === XMAS || rightDiagonal === INVERTED_XMAS) total++;
      }

      // Check left diagonal + flipped
      if (i + 3 < dataArr.length && j - 3 >= 0) {
        const leftDiagonal =
          dataArr[i][j] +
          dataArr[i + 1][j - 1] +
          dataArr[i + 2][j - 2] +
          dataArr[i + 3][j - 3];
        if (leftDiagonal === XMAS || leftDiagonal === INVERTED_XMAS) total++;
      }
    }
  }
  console.log(total);
};

const part2 = (data: string) => {
  let total = 0;
  const dataArr = dataToArray(data);

  for (let i = 0; i < dataArr.length; i++) {
    const line = dataArr[i];
    for (let j = 0; j < line.length; j++) {
      let rightDiagonalMatch = false;
      let leftDiagonalMatch = false;

      // Check right diagonal
      if (i + 2 < dataArr.length && j + 2 < line.length) {
        const rightDiagonal =
          dataArr[i][j] + dataArr[i + 1][j + 1] + dataArr[i + 2][j + 2];
        if (rightDiagonal === MAS || rightDiagonal === INVERTED_MAS)
          rightDiagonalMatch = true;
      }

      // Check left diagonal
      if (i + 2 < dataArr.length && j + 2 < line.length) {
        const leftDiagonal =
          dataArr[i][j + 2] + dataArr[i + 1][j + 1] + dataArr[i + 2][j];
        if (leftDiagonal === MAS || leftDiagonal === INVERTED_MAS)
          leftDiagonalMatch = true;
      }

      if (rightDiagonalMatch && leftDiagonalMatch) {
        total++;
      }
    }
  }
  console.log(total);
};

// part1(data);
part2(data);
