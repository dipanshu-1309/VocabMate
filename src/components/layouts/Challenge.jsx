import { useState } from "react";
import ProgressBar from "../ProgressBar";

export default function Challenge({day, daysWords, handleChangePage, handleIncrementAttempts, handleCompleteDay, PLAN}) {

  const [wordIndex,setWordIndex] = useState(0)
  const [inputVa, setInputVal] = useState('')
  


  const word = "copacetic";
  const definition = "In excellent order";

  return (
    <section id="challenge">
      <h1>{word}</h1>
      <p>{definition}</p>
      <div className="helper">
        <div>
          {/* contains error correction visual bars */}
          {[...Array(definition.length).keys()].map((element, elementIdx) => {
            //determine whether or not user has typed the character they think is coorect, and show red or blue based upon whether or not the input is actually correct
            return <div key={elementIdx}></div>;
          })}
        </div>
        <input type="text" placeholder="Enter the definition..." />
      </div>
      <div className="challenge-btns">
        <button className="card-button-secondary">
          <h6>Quit</h6>
        </button>

        <button className="card-button-primary">
          <h6>I forgot</h6>
        </button>
      </div>
      <ProgressBar />
    </section>
  );
}
