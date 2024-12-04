const filePath = "./data.txt";

const data = await Deno.readTextFile(filePath);
const testData = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const testData_part2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

const parseData_1 = (data: string) => {
  let total = 0;
  let match;
  const regex = /mul\((\d+),(\d+)\)/g;

  while ((match = regex.exec(data)) !== null) {
    const firstNum = Number(match[1]);
    const secondNum = Number(match[2]);

    total += firstNum * secondNum;
  }

  console.log(total);
};

const parseData_2 = (data: string) => {
  let total = 0;
  const regex = /mul\((\d+),(\d+)\)/g;

  let match;

  while ((match = regex.exec(data)) !== null) {
    const mulStartIndex = match.index; // The position where mul() starts

    if (
      data.lastIndexOf("do", mulStartIndex) >
        data.lastIndexOf("don't", mulStartIndex) ||
      (data.lastIndexOf("do", mulStartIndex) === -1 &&
        data.lastIndexOf("don't", mulStartIndex) === -1)
    ) {
      const firstNum = Number(match[1]);
      const secondNum = Number(match[2]);

      total += firstNum * secondNum;
    }
  }

  console.log(total);
};

parseData_2(data);
