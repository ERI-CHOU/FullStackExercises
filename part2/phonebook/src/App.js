import { useState } from 'react'

const Person = (props) => 
  <p>
    {props.name}
  </p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPersons = (event) => {
    event.preventDefault()
    if(newName === ''){
      window.alert('Name cannot be empty!')
    }else if(persons.filter(person => person.name === newName).length){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersons}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <Person key={person.name} name={person.name} />)}
    </div>
  )
}

export default App