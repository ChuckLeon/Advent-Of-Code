import { data } from "./data.ts";

const testData = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

const dataToArray = (data: string) => {
  const splittedData = data.split("\n\n");

  return {
    towels: splittedData[0].split(",").map((towel) => towel.trim()),
    designs: splittedData[1].split("\n"),
  };
};

const array = dataToArray(data);

const canBuildDesign = (
  design: string,
  pattern: Map<string, boolean> = new Map()
): boolean => {
  if (design === "") return true;
  if (pattern.has(design)) return pattern.get(design)!;

  for (const towel of array.towels) {
    if (design.startsWith(towel)) {
      const remaining = design.slice(towel.length);
      if (canBuildDesign(remaining, pattern)) {
        pattern.set(design, true);
        return true;
      }
    }
  }

  pattern.set(design, false);
  return false;
};

const part1 = () => {
  let possibleCount = 0;
  array.designs.forEach((design) => {
    if (canBuildDesign(design)) possibleCount++;
  });

  console.log(possibleCount);
};

const part2 = () => {};

part1();
part2();
