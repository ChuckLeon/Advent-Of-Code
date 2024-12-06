import { data } from "./data.ts";

const testData = ``;

const dataToArray = (data: string) => {
  return data.split("\n").map((val) => val.split(""));
};

const array = dataToArray(testData);

const part1 = () => {};
const part2 = () => {};

part1();
part2();
