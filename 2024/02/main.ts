import { data } from "./data.ts";

const testData = `80 80 82 85 88 89`;

const dataToArray = (data: string) => {
  return data
    .split("\n")
    .map((val) => val.split(/\s+/).map((num) => Number(num)));
};

const getNbOfSafeReports = (data: string) => {
  let safeReports = 0;

  const reports = dataToArray(data);

  for (const report of reports) {
    const ascending = report[0] < report[1];

    const passed = report.every((level, index) => {
      if (index !== 0) {
        const previousLevel = report[index - 1];

        return ascending
          ? level > previousLevel &&
              level - previousLevel >= 1 &&
              level - previousLevel <= 3
          : level < previousLevel &&
              previousLevel - level >= 1 &&
              previousLevel - level <= 3;
      }

      return true;
    });

    if (passed) safeReports++;
  }

  return safeReports;
};

const getNbOfSafeReportsDampened = (data: string): number => {
  let safeReports = 0;

  const reports = dataToArray(data);

  for (let report of reports) {
    const ascending =
      report[0] === report[1] ? report[1] < report[2] : report[0] < report[1];
    let violations = 0;

    let index = 1; // Start from the second element
    while (index < report.length) {
      const level = report[index];
      const previousLevel = report[index - 1];

      const isValid = ascending
        ? level > previousLevel &&
          level - previousLevel >= 1 &&
          level - previousLevel <= 3
        : level < previousLevel &&
          previousLevel - level >= 1 &&
          previousLevel - level <= 3;

      if (!isValid) {
        violations++;
        if (violations > 1) break;
        report.splice(index, 1);
        continue;
      }

      index++;
    }

    if (violations <= 1) safeReports++;
  }

  return safeReports;
};

const reportsCount = getNbOfSafeReports(data);
const dampenedReportsCount = getNbOfSafeReportsDampened(data);
console.log(dampenedReportsCount);
