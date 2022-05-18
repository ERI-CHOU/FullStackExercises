import { useState } from 'react'

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

const Statistics = ({good, neutral, bad}) => {
  if(good + neutral + bad === 0){
    return (
      <div>No feedback given</div>
    )
  }else{
    return (
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={good + neutral + bad} />
          <StatisticLine text={"average"} value={(good - bad) / (good + neutral + bad)} />
          <StatisticLine text={"positive"} value={100 * good / (good + neutral + bad) + " %"} />
        </tbody>
      </table>
    )
  }
}
  
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
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
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  );
}

export default App;
