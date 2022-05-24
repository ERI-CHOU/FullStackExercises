import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      handleErrorMessage('Name cannot be empty!')
    }else if(persons.filter(person => person.name === newName).length){//update person object when the name is already in db.json
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number : newNumber}
        personService.update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          handleInfoMessage(`Changed ${newName}'s number`)
        })
        .catch((error) => {
          handleErrorMessage(`Information of ${newName} has already been removed from server`)
         })
      }
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
        handleInfoMessage(`Added ${newName}`)
      })
    }
  }

  const handlePersonDelete = (name) => {
    if(window.confirm(`Delete  ${name}?`)){
      const person = persons.find(p => p.name === name)
      personService.deleteObj(person.id)
      .then((resp) => {
        setPersons(persons.filter(p => p.id !== person.id))
        handleInfoMessage(`Deleted ${name}`)
      })
      .catch(() => {
        handleInfoMessage(`Information of ${newName} has already been removed from server`)
      })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const personsToShow = newFilter.length ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons

  const handleInfoMessage = (msg) => {
    setInfoMessage(msg)
    setTimeout(() => {
      setInfoMessage(null)
    }, 4000)
  }

  const handleErrorMessage = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={infoMessage} cName="info" />
      <Notification message={errorMessage} cName="error" />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h1>add a new</h1>
      <PersonForm onSubmit={handlePersonSubmit} name={newName} number={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />
      <h1>Numbers</h1>
      <ul>
        {personsToShow.map(person => <Person key={person.name} person={person} handleDeleteClick={() => handlePersonDelete(person.name)}/>)} 
      </ul>
    </div>
  )
}

export default App