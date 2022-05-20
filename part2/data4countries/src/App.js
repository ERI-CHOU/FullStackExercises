import axios from 'axios'
import {useState, useEffect} from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(resp => {
      setCountries(resp.data)
    })
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)
  
  const countriesToShow = filter.length ? countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())) : countries

  return (
    <div className="App">
      <Filter value={filter} onChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  );
}

export default App;
