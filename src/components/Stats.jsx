export default function Stats() {

  const name = 'Dipanshu'
  const day = 16

  return (
    <div className="card stats-card">
      <div className="welcome-text">
        <h1>Welcome</h1>
        <h4 className="text-large">
          {name}
        </h4>
      </div>
      
      <div className="stats-column">
        <p>Streak 🔥</p>
        <h4>{day - 1}</h4>
      </div>

    </div>
  )
}
