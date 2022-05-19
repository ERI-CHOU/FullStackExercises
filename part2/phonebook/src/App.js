import { useState } from 'react'

const Person = ({person}) => 
  <p>
    {person.name} {person.number}
  </p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const addPersons = (event) => {
    event.preventDefault()
    if(newName === ''){
      window.alert('Name cannot be empty!')
    }else if(persons.filter(person => person.name === newName).length){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const personsToShow = newFilter.length ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPersons}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App