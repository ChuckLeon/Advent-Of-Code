from input import data
from enum import Enum

testData = """A Y
B X
C Z"""

class Score(Enum):
    DEFEAT = 0
    DRAW = 3
    WIN = 6

class Hand(Enum):
    ROCK = 1
    PAPER = 2
    SCISORS = 3

lose = ["AZ", "BX", "CY"]
draw = ["AX", "BY", "CZ"]
win = ["AY", "BZ", "CX"]

def getScore(round):    
    if(round in lose):
        return Score.DEFEAT.value
    elif(round in draw):
        return Score.DRAW.value
    else:
        return Score.WIN.value

def getHandScore(hand):
    match hand:
        case "X":
            return Hand.ROCK.value
        case "Y":
            return Hand.PAPER.value
        case "Z":
            return Hand.SCISORS.value

def play(match):    
    totalScore = 0
    matchArray = match.split("\n")

    for round in matchArray:                      
        totalScore += (getScore(round.replace(" ", "")) + getHandScore(round.split(" ")[1]))

    return totalScore

print(play(data))