import { data } from "./data.ts";

const testData = `80 80 82 85 88 89`;

const dataToArray = (data: string) => {
  return data
    .split("\n")
    .map((val) => val.split(/\s+/).map((num) => Number(num)));
};

const isAscending = (arr: number[]): boolean => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] !== arr[i + 1]) {
      return arr[i] < arr[i + 1];
    }
  }
  // If all elements are equal or the array is empty/single-element, return true (considered ascending).
  return true;
};

const isSafe = (report: number[]): boolean => {
  const ascending = isAscending(report);

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

  return passed;
};

const getNbOfSafeReports = (data: string) => {
  let safeReports = 0;

  const reports = dataToArray(data);

  for (const report of reports) {
    if (isSafe(report)) safeReports++;
  }

  return safeReports;
};

const getNbOfSafeReportsDampened = (data: string): number => {
  let safeReports = 0;

  const reports = dataToArray(data);

  for (const report of reports) {
    if (isSafe(report)) {
      safeReports++;
      continue;
    }

    for (let i = 0; i < report.length; i++) {
      const subReport = [...report];
      subReport.splice(i, 1);
      if (isSafe(subReport)) {
        safeReports++;
        break;
      }
    }
  }

  return safeReports;
};

const reportsCount = getNbOfSafeReports(data);
const dampenedReportsCount = getNbOfSafeReportsDampened(data);
console.log(dampenedReportsCount);
