import { data } from "./data.ts";

const testData = `3   4
4   3
2   5
1   3
3   9
3   3`;

const getDistance = (data: string) => {
  let total = 0;

  // 1. parse each line and split by white space
  const input = data.split("\n");
  const splitValues = input.map((val) => val.split(/\s+/));

  // 2. sort both array ascending
  const firstArray = splitValues // Could be replace by a array.reduce
    .map((val) => Number(val[0]))
    .sort((a, b) => a - b);
  const secondArray = splitValues
    .map((val) => Number(val[1]))
    .sort((a, b) => a - b);

  // 3. get difference between 2 numbers
  firstArray.forEach((num, index) => {
    const comparedNum = secondArray[index];

    // 4. add differences together
    if (num < comparedNum) total += comparedNum - num;
    else total += num - comparedNum;
  });

  return total;
};

const distance = getDistance(data);
console.log(distance);
