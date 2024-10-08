import { useState } from 'react'
import './App.css'

function App() {
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)

  if (!('process' in window)) {
    // @ts-ignore
    window.process = {}
  }

  const [weatherData, setWeatherData] = useState(false)

  // const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  // const apiHost = import.meta.env.VITE_WEATHER_API_HOST

  const getWeatherData = async (e) => {
    setWeatherData('')
    e.preventDefault()
    const endpoint = `https://weatherinquisitor.onrender.com/api/weather/?location=${location}`
    // const options = {
    //   method: 'GET',
    // }
    setLoading(true)
    try {
      const response = await fetch(endpoint)
      const result = await response.json()
      // set
      console.log(result)
      setLoading(false)
      setLocation('')
      setWeatherData(result)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
    console.log(e.target.value)
  }

  return (
    <main>
      <h1 className='text-3xl'>Weather Wizard</h1>

      <section>
        <form onSubmit={getWeatherData}>
          <input className='border-2 rounded border-emerald-400 py-3 px-12 w-1/3' onChange={handleLocationChange} type='text' placeholder='Just type in a city...' />
          {/* <button type='submit'>Search</button> */}
        </form>
      </section>

      <section>
        {loading && (
          <p>Loading...</p>
        )}
        {weatherData && (
          <>
            <h2>City - {weatherData.name}</h2>
            <p>Temperature - {weatherData.main.temp}</p>
            <p>Feels like {weatherData.main.feels_like}</p>
            <p>Humidity is about {weatherData.main.humidity}</p>
          </>
        )}
      </section>
    </main>
  )
}

export default App
