export default function History({history}) {

  const historyKeys = Object.keys(history)

  return (
    <div className="card history-card">
      <h4>History</h4>
      {historyKeys.length == 0 && (<p>
        You have no attempts! Press <b>Start</b> to begin ⭐️
      </p>)}
      <div className="history-list">
        <div className="card-button-secondary">
          <div>
              <p>Started</p>
              <h6>Jul 29 2025</h6>
          </div>
          <div>
            <p>Streak</p>
            <h6>53</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
