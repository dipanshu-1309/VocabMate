import { useState, useEffect } from "react";
import Challenge from "./components/layouts/Challenge";
import Dashboard from "./components/layouts/Dashboard";
import Layout from "./components/layouts/Layout";
import Welcome from "./components/layouts/Welcome";
import WORDS from './utils/VOCAB.json'
import { countdownIn24Hours, getWordByIndex, PLAN } from "./utils";


export default function App() {

  const [selectedPage, setSelectedPage] = useState(0)
  const [name, setName] = useState('')
  const [day, setDay] = useState(1)
  const [datetime, setDatetime] = useState(null)
  const [history, setHistory] = useState([])
  const [attempts, setAttempts] = useState(0)

  const daysWords = PLAN[day].map((idx)=>{
    return getWordByIndex(WORDS,idx).word
  })

  console.log(daysWords);

  function handleChangePage(pageIndex){
    setSelectedPage(pageIndex)
  }     
  
  function handleCreateAccount(){
    if(!name) { return}
    localStorage.setItem('username', name)
    handleChangePage(1)
  }

  function handleCompleteDay() {
    const newDay = day + 1
    const newDatetime = Date.now()
    setDay(newDay)
    setDatetime(newDatetime)

    localStorage.setItem('day', JSON.stringify({
      day: newDay,
      datetime: newDatetime
    }))
    setSelectedPage(1)
  }

  function handleIncrementAttempts() {
    // take the current attempt number, and add one and save it to local storage
    const newRecord = attempts + 1
    localStorage.setItem('attempts', newRecord)
    setAttempts(newRecord)
  }


  useEffect(() => {
    //this callback funC is triggered on page load
    if(!localStorage) {return} //if we dont have access to the DB, then exit the callback funC
    if(localStorage.getItem('username')){
      setName(localStorage.getItem('username'))

      setSelectedPage(1)
    }
    if (localStorage.getItem('attempts')) {
      // then wefound attempts
      setAttempts(parseInt(localStorage.getItem('attempts')))
    }

    if (localStorage.getItem('history')) {
      setHistory(JSON.parse(localStorage.getItem('history')))
    }

    if (localStorage.getItem('day')) {
      const { day: d, datetime: dt } = JSON.parse(localStorage.getItem('day'))
      setDatetime(dt)
      setDay(d)

      if (d > 1 && dt) {
        const diff = countdownIn24Hours(dt) 
        if (diff < 0) {
          console.log('Failed challenge')
          let newHistory = { ...history }
          const timestamp = new Date(dt)
          const formattedTimestamp = timestamp.toString().split(' ').slice(1, 4).join(' ')
          newHistory[formattedTimestamp] = d
          setHistory(newHistory)
          setDay(1)
          setDatetime(null)
          setAttempts(0)

          localStorage.setItem('attempts', 0)
          localStorage.setItem('history', JSON.stringify(newHistory))
          localStorage.setItem('day', JSON.stringify({ day: 1, datetime: null }))
        }
      }
    }
  }, [])

  const pages={
    0: <Welcome name={name} setName={setName} handleCreateAccount={handleCreateAccount}/>,
    1: <Dashboard history={history} name={name} attempts={attempts} PLAN={PLAN} day={day} handleChangePage={handleChangePage} daysWords={daysWords} datetime={datetime} />,
    2: <Challenge day={day} daysWords={daysWords} handleChangePage={handleChangePage} handleIncrementAttempts={handleIncrementAttempts} handleCompleteDay={handleCompleteDay} PLAN={PLAN}/>
  }

  return (
    <div id="root">
      <Layout>
        {pages[selectedPage]}
      </Layout>
    </div> 
  )
}
