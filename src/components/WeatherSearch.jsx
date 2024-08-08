import React, { useContext } from 'react'
import { WeatherContext } from '../contexts/ContextProvider'

const WeatherSearch = () => {


  const { city, setCity,fetchWeather } = useContext(WeatherContext)
  


  const handleSearch = () => {
    // console.log(city)
    fetchWeather(city)
    setCity('')
  }
  const handleKeypress = (e) => {
    if(e.key==='Enter') 
      handleSearch()
  }

  return (
    <div className=" p-5">
      <div className=" flex gap-5 items-center w-full">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeypress}
          className=" border-b border-slate-400 bg-transparent placeholder:text-slate-300 placeholder:text-opacity-50 w-full focus:outline-none py-2 text-white"
          placeholder="Enter City name ..."
        />
        <button
          onClick={handleSearch}
          disabled={!city}
          className=" bg-slate-300 bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition duration-200 px-3 py-2"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default WeatherSearch