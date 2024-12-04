import { data } from "./data.ts";

const testData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const dataToArray = (data: string) => {
  return data.split("\n").map((val) => val.split(/\s+/));
};

const getNbOfSafeReports = (data: string) => {
  let unsafeReports = 0;

  const reports = dataToArray(data);

  for (const report of reports) {
    const ascending = report[0] < report[1];

    for (const [index, level] of report.entries()) {
      if (index === 0) continue;

      const currLevel = Number(level);
      const previousLevel = Number(report[index - 1]);

      if (ascending) {
        if (
          currLevel > previousLevel &&
          currLevel - previousLevel >= 1 &&
          currLevel - previousLevel <= 3
        ) {
          continue;
        }
      } else {
        if (
          currLevel < previousLevel &&
          previousLevel - currLevel >= 1 &&
          previousLevel - currLevel <= 3
        ) {
          continue;
        }
      }

      unsafeReports++;
      break;
    }
  }

  return reports.length - unsafeReports;
};

const count = getNbOfSafeReports(data);
console.log(count);
