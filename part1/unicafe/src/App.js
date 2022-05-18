import { useState } from 'react'
//import './App.css'


const Button = (props) => {
  return (
      <button onClick={props.handleClick}>
        {props.text}
      </button>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <p>
      {props.text} {props.count}
    </p>
  )
} 


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const scores = {
    good: {
      score: 1
    },
    netural: {
      score: 0
    },
    bad: {
      score: -1
    }
  }

  const handleGoodClick = () => setGood(good + 1)

  const hancleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)

  const avg = (good, neutral, bad) => {
    if(good + neutral + bad === 0){
      return 0
    }else{
      return (good * scores.good.score + neutral * scores.netural.score + bad * scores.bad.score) / (good + neutral + bad)
    }
  }

  const poi = (good, neutral, bad) => {
    if( good + neutral + bad === 0){
      return 0
    }else{
      return 100 * good / (good + neutral + bad) + " %"
    }
  }

  return (
    <div className="App">
      <Header text="give feedback" />
      <Button handleClick={handleGoodClick} text={"good"} />
      <Button handleClick={hancleNeutralClick} text={"neutral"} />
      <Button handleClick={handleBadClick} text={"bad"} />
      <Header text={"statistics"} />
      <Content text={"good"} count={good} />
      <Content text={"neutral"} count={neutral} />
      <Content text={"bad"} count={bad} />
      <Content text={"all"} count={good + neutral + bad} />
      <Content text={"average"} count={avg(good, neutral, bad)} />
      <Content text={"positive"} count={poi(good, neutral, bad)} />
    </div>
  );
}

export default App;
