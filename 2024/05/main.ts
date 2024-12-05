import { order, pages } from "./data.ts";

const testOrder = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`;

const testPages = `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const stringToArray = (data: string, splitter: string) => {
  return data.split("\n").map((val) => val.split(splitter).map(Number));
};

const orderArr = stringToArray(order, "|");
const pagesArr = stringToArray(pages, ",");

const part1 = () => {
  let total = 0;
  const failedPages: number[][] = [];

  for (const page of pagesArr) {
    let pageIsGood = true;

    for (const [index, num] of page.entries()) {
      // check if num is in any order
      for (const order of orderArr) {
        const numIndex = order.findIndex((ordNum) => ordNum === num);
        if (numIndex !== -1) {
          const indexToCheck = numIndex === 0 ? 1 : 0;
          const secondNumIndex = page.findIndex(
            (pageNum) => pageNum === order[indexToCheck]
          );

          // check if the the order is correct in the page
          if (
            secondNumIndex === -1 ||
            (numIndex === 0 && index < secondNumIndex) ||
            (numIndex === 1 && index > secondNumIndex)
          ) {
            continue;
          } else {
            pageIsGood = false;
            failedPages.push(page);
            break;
          }
        }
      }

      if (!pageIsGood) break;
    }

    if (!pageIsGood) continue;

    // 3. if so, get the middle number from the page and add to total
    total += page[Math.ceil(page.length / 2) - 1];
  }

  return failedPages;
};

const part2 = () => {
  let total = 0;
  const failedPages = part1();

  for (const [pageIndex, page] of failedPages.entries()) {
    for (const [numIndex, num] of page.entries()) {
      for (const order of orderArr) {
        const orderIndex = order.findIndex((ordNum) => ordNum === num);
        if (orderIndex !== -1) {
          const indexToCheck = orderIndex === 0 ? 1 : 0;
          const secondNumIndex = page.findIndex(
            (pageNum) => pageNum === order[indexToCheck]
          );

          if (
            secondNumIndex === -1 ||
            (orderIndex === 0 && numIndex < secondNumIndex) ||
            (orderIndex === 1 && numIndex > secondNumIndex)
          ) {
            continue;
          } else {
            // change the order to fit
            const temp = failedPages[pageIndex][numIndex];

            failedPages[pageIndex][numIndex] =
              failedPages[pageIndex][secondNumIndex];
            failedPages[pageIndex][secondNumIndex] = temp;
          }
        }
      }
    }
  }

  console.log(failedPages);
  for (const page of failedPages) {
    total += page[Math.floor(page.length / 2)];
  }

  console.log(total);
};

part1();
part2();
