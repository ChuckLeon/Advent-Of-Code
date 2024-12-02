import { data } from "./data.ts";

const testData = `3   4
4   3
2   5
1   3
3   9
3   3`;

const dataToArray = (data: string) => {
  return data.split("\n").map((val) => val.split(/\s+/)); //Split by new line and then by whitespace
};

const getDistance = (data: string) => {
  let total = 0;

  const dataArray = dataToArray(data);

  const leftCol = dataArray.map((val) => Number(val[0])).sort((a, b) => a - b);
  const rightCol = dataArray.map((val) => Number(val[1])).sort((a, b) => a - b);

  leftCol.forEach((num, index) => {
    const comparedNum = rightCol[index];

    if (num < comparedNum) total += comparedNum - num;
    else total += num - comparedNum;
  });

  return total;
};

const getSimilarity = (data: string) => {
  let total = 0;

  const dataArray = dataToArray(data);

  const leftCol = dataArray.map((val) => Number(val[0]));
  const rightCol = dataArray.map((val) => Number(val[1]));

  leftCol.forEach((num) => {
    const count = rightCol.filter((x) => x === num).length;
    total += num * count;
  });

  return total;
};

const distance = getDistance(data);
const similarity = getSimilarity(data);

console.log(distance);
console.log(similarity);
