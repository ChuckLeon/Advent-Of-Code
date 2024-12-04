import { data } from "./data.ts";

const testData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const dataToArray = (data: string) => {
  return data
    .split("\n")
    .map((val) => val.split(/\s+/).map((num) => Number(num))); // Refactor this to be cleaner
};

const getNbOfSafeReports = (data: string) => {
  let unsafeReports = 0;

  const reports = dataToArray(data);

  for (const report of reports) {
    const ascending = report[0] < report[1];

    for (const [index, level] of report.entries()) {
      if (index === 0) continue;

      const previousLevel = report[index - 1];

      if (ascending) {
        if (
          level > previousLevel &&
          level - previousLevel >= 1 &&
          level - previousLevel <= 3
        ) {
          continue;
        }
      } else {
        if (
          level < previousLevel &&
          previousLevel - level >= 1 &&
          previousLevel - level <= 3
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

const getNbOfSafeReportsDampened = (data: string): number => {
  let unsafeReports = 0;
  const reports = dataToArray(data);

  for (let report of reports) {
    const ascending = report[0] < report[1];
    let violations = 0;
    let index = 1;

    while (index < report.length) {
      const level = report[index];
      const previousLevel = report[index - 1];

      if (ascending) {
        if (
          level > previousLevel &&
          level - previousLevel >= 1 &&
          level - previousLevel <= 3
        ) {
          index++;
          continue;
        }
      } else {
        if (
          level < previousLevel &&
          previousLevel - level >= 1 &&
          previousLevel - level <= 3
        ) {
          index++;
          continue;
        }
      }

      violations++;
      if (violations > 1) {
        unsafeReports++;
        break;
      }

      // Remove the violating level
      report.splice(index, 1);
    }
  }

  return reports.length - unsafeReports;
};

// const count = getNbOfSafeReports(data);
const count = getNbOfSafeReportsDampened(data);
console.log(count);
