import { useState, useEffect } from "react";
import Challenge from "./components/layouts/Challenge";
import Dashboard from "./components/layouts/Dashboard";
import Layout from "./components/layouts/Layout";
import Welcome from "./components/layouts/Welcome";
import WORDS from './utils/VOCAB.json'
import { getWordByIndex, PLAN } from "./utils";


export default function App() {

  const [selectedPage, setSelectedPage] = useState(0)
  const [name, setName] = useState('')
  const [day, setDay] = useState(1)
  const [datetime, setDatetime] = useState(null)
  const [history, SetHistory] = useState([])
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

  useEffect(() => {
    //this callback funC is triggered on page load
    if(!localStorage) {return} //if we dont have access to the DB, then exit the callback funC
    if(localStorage.getItem('username')){
      setName(localStorage.getItem('username'))

      setSelectedPage(1)
    }
  }, [])

  const pages={
    0: <Welcome name={name} setName={setName} handleCreateAccount={handleCreateAccount}/>,
    1: <Dashboard history={history} name={name} attempts={attempts} PLAN={PLAN} day={day} handleChangePage={handleChangePage} daysWords={daysWords} datetime={datetime} />,
    2: <Challenge />
  }

  return (
    <div id="root">
      <Layout>
        {pages[selectedPage]}
      </Layout>
    </div> 
  )
}
