import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(resp => {
      setPersons(resp.data)
    })
  }, [])

  const addPersons = (event) => {
    event.preventDefault()
    if(newName === ''){
      window.alert('Name cannot be empty!')
    }else if(persons.filter(person => person.name === newName).length){
      const person = persons.find(p => p.name === newName)
      const changedPerson = {...person, number : newNumber}
      axios.put(`http://localhost:3001/persons/${person.id}`, changedPerson).then(resp => {
        setPersons(persons.map(person => person.name !== newName ? person : resp.data))
        setNewName('')
        setNewNumber('')
      })
    }else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(resp => {
        setPersons(persons.concat(resp.data))
        setNewName('')
        setNewNumber('')
      })
    }
  }



  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const personsToShow = newFilter.length ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPersons} name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons value={personsToShow} />
    </div>
  )
}

export default App