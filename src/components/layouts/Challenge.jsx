import { useState } from "react";
import ProgressBar from "../ProgressBar";
import { isEncountered, shuffle } from "../../utils";
import DEFINITIONS from "../../utils/VOCAB.json";

export default function Challenge({day, daysWords, handleChangePage, handleIncrementAttempts,handleCompleteDay, PLAN}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [inputVal, setInputVal] = useState("");
  const [showDefintion, setShowDefinition] = useState(false);
  const [listToLearn, setListToLearn] = useState([
    ...daysWords,
    ...shuffle(daysWords),
    ...shuffle(daysWords),
    ...shuffle(daysWords),
  ]);

  const word = listToLearn[wordIndex];
  const isNewWord =
    showDefintion ||
    (!isEncountered(day, word) && wordIndex < daysWords.length);
  const definition = DEFINITIONS[word];

  function giveUp() {
    setListToLearn([...listToLearn, word]);
    setShowDefinition(true);
  }

  return (
    <section id="challenge">
      <h1>{word}</h1>
      {isNewWord && <p>{definition}</p>}
      <div className="helper">
        <div>
          {/* contains error correction visual bars */}
          {[...Array(definition.length).keys()].map((char, elementIdx) => {
            //determine whether or not user has typed the character they think is coorect, and show red or blue based upon whether or not the input is actually correct
            const styleToApply =
              inputVal.length < char + 1
                ? ""
                : inputVal.split("")[elementIdx].toLowerCase() ==
                  definition.split("")[elementIdx].toLowerCase()
                ? "correct"
                : "incorrect";
            return <div className={" " + styleToApply} key={elementIdx}></div>;
          })}
        </div>
        <input
          value={inputVal}
          onChange={(e) => {
            // if a user has entered the correct number of characters
            // 1. if the entry is correct, we needd to increment attempts and move them on to the next word
            // 2. if the entry is incorrect we need to increment attempts, and also if they
            if (
              e.target.value.length == definition.length &&
              e.target.value.length > inputVal.length
            ) {
              // compare words
              handleIncrementAttempts();

              if (e.target.value.toLowerCase() == definition.toLowerCase()) {
                // then the user has the correct input
                if (wordIndex >= listToLearn.length - 1) {
                  handleCompleteDay();
                  return;
                }
                setWordIndex(wordIndex + 1);
                setShowDefinition(false);
                setInputVal("");
                return;
                // check if finished all the words, then end the day, otherwise go to next word
              }
            }

            setInputVal(e.target.value);
          }}
          type="text"
          placeholder="Enter the defintion..."
        />
      </div>
      <div className="challenge-btns">
        <button
          onClick={() => {
            handleChangePage(1);
          }}
          className="card-button-secondary"
        >
          <h6>Quit</h6>
        </button>

        <button className="card-button-primary" onClick={giveUp}>
          <h6>I forgot</h6>
        </button>
      </div>
      <ProgressBar
        remainder={(wordIndex * 100) / listToLearn.length}
        text={`${wordIndex} / ${listToLearn.length}`}
      />
    </section>
  );
}
