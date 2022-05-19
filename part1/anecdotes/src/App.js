import { useState } from 'react'

const Button = (props) => {
  return (
      <button onClick={props.handleClick}>
        {props.text}
      </button>
  )
}

const Display = (props) => {
  return (
    <p>
      {props.text} <br></br>
      has {props.value} votes
    </p>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]


  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))


  const handleNextClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div className="App">
      <Header text="Anecdote of the day" />
      <Display text={anecdotes[selected]} value={points[selected]}/>
      <Button handleClick={handleVoteClick} text={"vote"} />
      <Button handleClick={handleNextClick} text={"next anecdote"} />
      <Header text="Anecdote with most votes" />
      <Display text={anecdotes[points.indexOf(Math.max(...points))]} value={Math.max(...points)} />
    </div>
  );
}

export default App;
