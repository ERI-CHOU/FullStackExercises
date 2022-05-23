import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handlePersonSubmit = (event) => {
    event.preventDefault()//prevent default event handler
    if(newName === ''){//display error message to user when the name is empty
      window.alert('Name cannot be empty!')
    }else if(persons.filter(person => person.name === newName).length){//update person object when the name is already in db.json
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number : newNumber}
        personService.update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
      })}
    }else{//otherwise, create a new person object 
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handlePersonDelete = (name) => {
    if(window.confirm(`Delete  ${name}?`)){
      const person = persons.find(p => p.name === name)
      const changedPerson = {...person, number : newNumber}
      personService.deleteObj(person.id)
      .then((resp) => {
        setPersons(persons.filter(p => p.id !== person.id))
        console.log(resp)
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
      <PersonForm onSubmit={handlePersonSubmit} name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <Person key={person.name} person={person} handleDeleteClick={() => handlePersonDelete(person.name)}/>)} 
      </ul>
    </div>
  )
}

export default App