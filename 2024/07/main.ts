import { data } from "../../2024/07/data.ts";

const testData = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const dataToArray = (data: string) => {
  return data.split("\n").map((data) => data.split(":"));
};

const equations = dataToArray(data);
const formattedEquations = equations
  .map((line) => line.map((num) => num.trim().split(" ")))
  .map((line) => [Number(...line[0]), line[1].map(Number)]);

function matchTotal(total: number, numbers: number[]): boolean {
  // Helper function to recursively check possible operations
  const check = (current: number, index: number): boolean => {
    // If we've used all numbers, check if the result matches the total
    if (index === numbers.length) {
      return current === total;
    }

    // Get the next number
    const nextNumber = numbers[index];

    // Try all four operations and recurse
    return (
      check(current + nextNumber, index + 1) || // Addition
      check(current * nextNumber, index + 1) // Multiplication
      // check(current - nextNumber, index + 1) || // Subtraction
      // (nextNumber !== 0 && check(current / nextNumber, index + 1)) // Division (prevent divide by zero)
    );
  };

  // Start recursion with the first number
  return check(numbers[0], 1);
}

const part1 = () => {
  let total = 0;

  //1. check if you can combine the right side of the array to make the first element
  for (const line of formattedEquations) {
    const sum = line[0];
    const numbers = line[1];

    if (Array.isArray(numbers) && !Array.isArray(sum)) {
      if (matchTotal(sum, numbers)) {
        total += sum;
      }
    }
  }

  console.log(total);
};
const part2 = () => {};

part1();
part2();
