import React, { useEffect, useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  // 'https://restcountries.com/v3.1/name/{name}?fullText=true'

  // setCountry('https://restcountries.com/v3.1/name/Guatemala')
  useEffect(() => {
  fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCountry(json);
        console.log(json)
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setError(err.message);
        // setLoading(false);
      });
  }, [name])

  console.log(country)
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (country[0] != undefined) {
    // let image = require("folder/image.format");
    return (
      <div>
        <h3>{country[0].name.common} </h3>
        <div>capital {country[0].capital[0]} </div>
        <div>population {country[0].population}</div> 
        <img src={country[0].flags.png} height='100' alt={`flag of ${country[0].name.common}`}/>
      </div>
    )
  }

    return (
      <div>
        not found...
      </div>
    )
  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App