from input import data

testData = """1000
2000
3000

4000

5000
6000

7000
8000
9000

10000"""

parsedArray = []

def getSummedTop3(array):
    return sum(sorted(array, reverse=True)[0:3])

def parseData(elvesCalories):
    elvesCalories = elvesCalories.split("\n\n")    

    for calories in elvesCalories:
        calories = sum(list(map(int, calories.split("\n"))))
        parsedArray.append(calories)

    top1 = str(max(parsedArray))
    top3 = str(getSummedTop3(parsedArray))

    return "Top 1: " + top1 + "\n" + "Total of top 3: " + top3

print(parseData(data))