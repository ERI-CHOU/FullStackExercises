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

  const handleGoodClick = () => setGood(good + 1)

  const hancleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)

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
    </div>
  );
}

export default App;
