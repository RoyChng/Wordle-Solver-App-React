import { useState } from "react";
import { NUM_COLUMNS, NUM_ROWS } from "./Configuration/config";
import padWordsEntered from "./Logic/padWordsEntered";
import generateBestWords, {
  resetPossibleWordsList,
} from "./Logic/generateBestWords";

import "./App.css";

import WordLeaderboard from "./Components/WordLeaderboard/WordLeaderboard";
import GameGrid from "./Components/GameGrid/GameGrid";
import GameKeyboard from "./Components/UserInput/GameKeyboard/GameKeyboard";
import WordMarkingSelector from "./Components/UserInput/WordMarkingSelector/WordMarkingSelector";
import GuessedCorrectlyForm from "./Components/UserInput/GuessedCorrectlyForm/GuessedCorrectlyForm";
import EndModal from "./Components/OverlayModal/EndModal";

// Creates an initial object with keys words set to an empty array with NUM_ROWS number of nested empty arrays and wordMarking set to an empty array with NUM_ROWS number of nested empty arrays
const INITIAL_WORDS_ENTERED = padWordsEntered({
  words: Array.from(Array(NUM_ROWS), () => []),
  wordMarking: Array.from(Array(NUM_ROWS), () => []),
});

function App() {
  const [userInputType, setUserInputType] = useState("keyboard");
  const [wordsEntered, setWordsEntered] = useState(INITIAL_WORDS_ENTERED);
  const [currentRowColumn, setRowColumn] = useState([0, 0]);
  const [gameInstruction, setGameInstruction] = useState(
    "Enter The Word You Chose."
  );
  const [showGenerateBtn, setShowGenerateBtn] = useState(false);
  const [bestWordsList, setBestWordsList] = useState([
    "Predicted words will appear here",
    "instruction",
  ]);
  const [showEndModal, setShowEndModal] = useState({
    show: false,
    title: "",
    description: "",
  });

  const addLetterHandler = function (letter) {
    const [currentRow, currentColumn] = currentRowColumn;

    if (letter === "Enter") {
      if (
        wordsEntered.words[currentRow].filter((letter) => letter !== " ")
          .length === 5
      ) {
        // If Enter is pressed & all letters of selected row is filled, state changes to selecting word markings
        setUserInputType("wordMarkingSelector");

        // Resets selector to first letter in row (0th) letter
        setRowColumn([currentRow, 0]);

        // Changes game instruction (instructs player to add letter marking)
        setGameInstruction("Set the letter marking for each letter.");
        return;
      } else {
        alert("The word must have 5 letters!");
        return;
      }
    }
    setWordsEntered((prevWordsEntered) => {
      // Creates Deep Copy
      const wordsEntered = JSON.parse(JSON.stringify(prevWordsEntered));

      // If Delete key, removes currently sellected letter
      if (letter === "DEL") {
        if (wordsEntered.words[currentRow].join("").trim().length > 0) {
          // Moves selected letter back 1 column
          if (wordsEntered.words[currentRow][currentColumn] === " ")
            setRowColumn(() => [currentRow, currentColumn - 1]);
          // Sets current letter to empty string (deletes it)
          else wordsEntered.words[currentRow][currentColumn] = " ";
        } else alert("No letter to delete!");

        return wordsEntered;
      }

      // Assigns selectedRow to the selected row
      const selectedRow = wordsEntered.words[currentRow];

      // In the selected row, changes curent letter to new letter
      selectedRow[currentColumn] = letter;

      // Goes to the next letter (column) in row, if not at the last letter
      if (currentColumn !== NUM_COLUMNS - 1)
        setRowColumn(() => [currentRow, currentColumn + 1]);

      return padWordsEntered(wordsEntered);
    });
  };

  const addMarkingHandler = function (wordMarking) {
    const [currentRow, currentColumn] = currentRowColumn;

    setWordsEntered((prevWordsEntered) => {
      // Creates Deep Clone
      const wordsEntered = JSON.parse(JSON.stringify(prevWordsEntered));

      // Selects selected row
      const selectedRow = wordsEntered.wordMarking[currentRow];

      // Changes selected element to given word marking
      selectedRow[currentColumn] = wordMarking;

      console.log(currentColumn);

      // Goes to next column if not at last column
      if (currentColumn !== NUM_COLUMNS - 1)
        setRowColumn(() => [currentRow, currentColumn + 1]);

      return wordsEntered;
    });

    setShowGenerateBtn(true);
  };

  const selectLetterHandler = function (direction) {
    // Direction is either "next" or "prev"
    const [currentRow, currentColumn] = currentRowColumn;

    // Changes currently selected column based on button clicked
    let newColumn =
      direction === "next" ? currentColumn + 1 : currentColumn - 1;

    // If at last column and the next btn is pressed, goes to first column. If at first column and prev btn is pressed, goes to last column.
    if (newColumn === -1) newColumn = NUM_COLUMNS - 1;
    else newColumn = newColumn % NUM_COLUMNS;

    setRowColumn(() => [currentRow, newColumn]);
  };

  const generateWordsHandler = function () {
    // Remove generate words btn
    setShowGenerateBtn(false);

    // Indicate to user to wait for words to generate
    setBestWordsList([
      "Predicting best possible word(s), this may take some time.",
      "instruction",
    ]);
    const [currentRow] = currentRowColumn;

    // Generates best word
    const [successfullyGeneratedWords, bestWords] = generateBestWords(
      wordsEntered.words[currentRow],
      wordsEntered.wordMarking[currentRow]
    );

    if (!successfullyGeneratedWords) {
      // If no best words, indicate to user that the game is over
      setBestWordsList([
        "The algorithm is unable to find a word in its words list that matches all the given conditions.",
        "instruction",
      ]);
      setShowEndModal({
        show: true,
        title: "Game Over",
        description:
          "The algorithm couldn't find a word in its word list that matches all given conditions",
      });
      return;
    }

    // If there are best words, show to user
    setBestWordsList([bestWords, "output"]);
    setGameInstruction(`The algorithm suggests you try ${bestWords[0][0]}`);
    setUserInputType("guessedCorrectlyForm");
  };

  const guessCorrectlyHandler = function (response) {
    switch (response) {
      case "no":
        // Goes back to allowing user to enter a new word
        setUserInputType("keyboard");
        setGameInstruction("Type the word you chose");

        // If already at last row, shows game over modal
        if (currentRowColumn[0] === NUM_ROWS - 1) {
          setShowEndModal({
            show: true,
            title: "Game Over",
            description: "The algorithm couldn't find the word.",
          });
          setUserInputType("none");
          break;
        }

        // Goes to next row to continue playing
        setRowColumn(([currentRow]) => [currentRow + 1, 0]);
        break;
      case "yes":
        // If word has been found (indicated by the user), shows game over modal (asks to reset)
        setShowEndModal({
          show: true,
          title: "Game Over",
          description: "The algorithm has found the word.",
        });
    }
  };

  const modalClickHandler = function (reset) {
    console.log(reset);
    if (reset) {
      // If player wants to reset, state is set to initial conditions
      setShowEndModal({ show: false, title: "", description: "" });
      setUserInputType("keyboard");
      setWordsEntered({ ...INITIAL_WORDS_ENTERED });
      setRowColumn([0, 0]);
      setGameInstruction("Enter The Word You Chose");
      setShowGenerateBtn(false);
      setBestWordsList(["Predicted words will appear here", "instruction"]);
      resetPossibleWordsList();
      return;
    }

    // Else, removes modal and user input, indicating to the user that the game is over
    setShowEndModal({ show: false, title: "", description: "" });
    setUserInputType("none");
    setGameInstruction("The current game has ended");
  };

  let userInputElement;
  switch (userInputType) {
    // Returns the given user input element
    case "keyboard":
      userInputElement = <GameKeyboard onAddLetter={addLetterHandler} />;
      break;

    case "wordMarkingSelector":
      userInputElement = (
        <WordMarkingSelector
          onAddMarking={addMarkingHandler}
          onSelectLetter={selectLetterHandler}
          showGenerateBtn={showGenerateBtn}
          onGenerateWords={generateWordsHandler}
        />
      );
      break;

    case "guessedCorrectlyForm":
      userInputElement = (
        <GuessedCorrectlyForm onGuessCorrectly={guessCorrectlyHandler} />
      );
      break;

    case "none":
      userInputElement = "";
      break;
  }

  const modalEL = showEndModal.show ? (
    <div className="overlay__container">
      <EndModal
        onModalClick={modalClickHandler}
        title={showEndModal.title}
        description={showEndModal.description}
      />
    </div>
  ) : (
    ""
  );

  return (
    <div className="root__container">
      <nav>
        <ul>
          <li className="nav__title">Worlde Solver</li>
        </ul>
      </nav>
      <div className="game__container">
        <GameGrid
          wordsEntered={wordsEntered}
          currentRowColumn={currentRowColumn}
          gameInstruction={gameInstruction}
        ></GameGrid>
        <WordLeaderboard bestWordsList={bestWordsList}></WordLeaderboard>
      </div>
      <div className="user__input--container">{userInputElement}</div>
      {modalEL}
    </div>
  );
}

export default App;
