import initialWordList from "./wordsArray";

let hiddenLetters = [];
let correctLetters = [];
let wrongLetters = [];
let possibleWords = [...initialWordList];

function clearArrays() {
  correctLetters = [];
  wrongLetters = [];
  hiddenLetters = [];
}

function possibleWordMarkings(wordToCompare, possibleWords) {
  // For each word in possibleWords, returns an array of wordmarkings given the wordToCompare
  return possibleWords.map((word) => {
    let wordMarking = "";
    word.split("").forEach((letter, i) => {
      if (wordToCompare[i] === letter) wordMarking += "C";
      else if (wordToCompare.includes(letter)) wordMarking += "H";
      else wordMarking += "I";
    });
    return wordMarking;
  });
}

function mostCommonWordMarking(wordToCompare, possibleWords) {
  const wordMarkings = possibleWordMarkings(wordToCompare, possibleWords);

  // Using the array wordMarkings, finds most common word marking

  const hashmap = wordMarkings.reduce((acc, curMarking) => {
    acc[curMarking] = (acc[curMarking] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(hashmap).reduce((curMostCommon, cur) => {
    if (hashmap[curMostCommon] > hashmap[cur]) return curMostCommon;
    else return cur;
  });
}

function calcWordValue(wordToCompare, possibleWords) {
  const wordMarking = mostCommonWordMarking(wordToCompare, possibleWords);

  // Using the most common word marking, finds out how much that word marking can reduce the array of possible words to. Thus the more it reduces the better; the lower the score, the better

  let wordValue = possibleWords.length;

  possibleWords.forEach((possibleWord) => {
    possibleWord.split("").find((letter, i) => {
      if (wordMarking[i] === "C" && letter !== wordToCompare[i]) {
        wordValue -= 1;
        return true;
      } else if (wordMarking[i] === "H" && !wordToCompare.includes(letter)) {
        wordValue -= 1;
        return true;
      } else if (wordMarking[i] === "I" && wordToCompare.includes(letter)) {
        wordValue -= 1;
        return true;
      }
      return false;
    });
  });

  return wordValue;
}

function filterPossibleWords() {
  console.log(wrongLetters, hiddenLetters, correctLetters);
  // Removes words with selected wrong letters
  if (wrongLetters.length > 0) {
    possibleWords = possibleWords.filter((word) => {
      const possibleWord = word.split("").find((letter) => {
        return wrongLetters.includes(letter);
      });

      return !Boolean(possibleWord);
    });
  }

  console.log(possibleWords, "filtered wrongs");

  // Ensures hidden letters are in array
  if (hiddenLetters.length > 0) {
    possibleWords = possibleWords.filter((word) => {
      const possibleWord = hiddenLetters.find(([hiddenLetter, hiddenIndex]) => {
        return !(
          word.includes(hiddenLetter) && word[hiddenIndex] !== hiddenLetter
        );
      });

      return !Boolean(possibleWord);
    });
  }

  console.log(possibleWords, "filtered hiddens");
  // Ensures correct letters are in and in the same placement
  if (correctLetters.length > 0) {
    possibleWords = possibleWords.filter((word) => {
      const possibleWord = correctLetters.find(
        ([correctLetter, correctLetterIndex]) => {
          return !(
            word.includes(correctLetter) &&
            word[correctLetterIndex] === correctLetter
          );
        }
      );

      return !Boolean(possibleWord);
    });
  }
  console.log(possibleWords.length, possibleWords, "filtered corrects");
}

function placeLetters(word, wordMarking) {
  // Words & wordMarking array length must be identical
  word.forEach((letter, i) => {
    switch (wordMarking[i]) {
      case "I":
        wrongLetters.push(letter);
        break;
      case "H":
        hiddenLetters.push([letter, i]);
        break;
      case "C":
        correctLetters.push([letter, i]);
        hiddenLetters = hiddenLetters.filter(
          ([hiddenLetter]) => hiddenLetter !== letter
        );
        break;
    }
  });

  // If a correct letter is marked as wrong, removes it (based on how Wordle is played)
  wrongLetters = wrongLetters.filter((wrongLetter) => {
    return !correctLetters.some(
      ([correctLetter]) => correctLetter === wrongLetter
    );
  });

  // If a hidden letter is marked as wrong, removes it (based on how Wordle is played)

  wrongLetters = wrongLetters.filter((wrongLetter) => {
    return !hiddenLetters.some(
      ([hiddenLetter]) => wrongLetter === hiddenLetter
    );
  });
}

export default function bestPossibleWords(
  word,
  wordMarking,
  returnNumValues = 10
) {
  console.log(word, wordMarking, "called");
  placeLetters(
    word.map((word) => word.toLowerCase()),
    wordMarking
  );
  filterPossibleWords();
  console.log(possibleWords);
  clearArrays();

  // Before finding the best word, if there is only one word left or none left after filtering, function returns
  if (possibleWords.length === 1) return [true, [possibleWords]];
  else if (possibleWords.length === 0) return [false, possibleWords];

  // Finds best word to guess from given word list
  const wordValues = possibleWords.map((possibleWord) => {
    const possibleWordsCopy = [...possibleWords];
    possibleWordsCopy.splice(possibleWords.indexOf(possibleWord), 1);
    return [possibleWord, calcWordValue(possibleWord, possibleWordsCopy)];
  });

  console.log(wordValues);

  // Sorts the word list based on lowest score
  const wordValuesSorted = wordValues.sort((a, b) => a[1] - b[1]);

  // Shows the first n values
  const maxIndex =
    wordValues.length <= returnNumValues ? wordValues.length : returnNumValues;

  console.log(wordValuesSorted, "end");
  return [true, wordValuesSorted.slice(0, maxIndex)];
}

export const resetPossibleWordsList = function () {
  possibleWords = [...initialWordList];
};
