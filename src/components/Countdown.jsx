import { useState } from "react";
import { convertMilliseconds, countdownIn24Hours } from "../utils";

export default function Countdown({handleChangePage, daysWords, datetime, day}) {

  const targetMillis = datetime || Date.UTC(2025, 8, 2,12 ,0)
  const [remainingMs, setRemainingMs] = useState(countdownIn24Hours(targetMillis))  
  const timer = convertMilliseconds(remainingMs)

  return (
    <div className="card countdown-card">
      <h1 className="item-header">Day {1}</h1>
      <div className="today-container">
        <div>
          <p>Time remaining</p>
          <h3>{datetime ? `${Math.abs(timer.hours)}H ${Math.abs(timer.minutes)}M ${Math.abs(timer.seconds)}` : '23H 59M 60S'}</h3>
        </div>
        <div>
          <p>Words for today</p>
          <h3>{daysWords.length}</h3>
        </div>
      </div>
      <button  onClick={()=>{handleChangePage(2)}}  className="start-task">
        <h6>Start</h6>
      </button>
    </div>
  )
}
