import { NUM_ROWS } from "../Configuration/config";

export default function padWordsEntered(padWordsEntered) {
  // Pad words arrays with an empty string until it is of length NUM_ROWS
  padWordsEntered.words = padWordsEntered.words.map((wordArray) => {
    return wordArray
      .join("")
      .padEnd(NUM_ROWS - 1, " ")
      .split("");
  });

  // Pad wordMarking arrays with "I" (incorrect - word marking) until it is of length NUM_ROWS
  padWordsEntered.wordMarking = padWordsEntered.wordMarking.map(
    (wordMarkingArray) => {
      return wordMarkingArray
        .join("")
        .padEnd(NUM_ROWS - 1, "I")
        .split("");
    }
  );

  return padWordsEntered;
}
