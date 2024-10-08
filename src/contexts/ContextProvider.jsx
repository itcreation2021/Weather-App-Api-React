import axios from 'axios';
import { getName } from 'country-list';
import { format } from 'date-fns';
import React, { createContext, useEffect, useState } from 'react'

export const WeatherContext = createContext();

const ContextProvider = ({children}) => {

        const [city, setCity] = useState("");
        const [weather, setWeather] = useState(null)
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false)


  const fetchWeather = async (cityName) => {
      
    setLoading(true);

      const API_KEY = '022abcff0c07a6562254cf0815022243';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

      try {

        const response = await axios.get(url)
        // console.log(response.data)
        const data = response.data;
        const countryCode = data.sys.country;
        const country = getName(countryCode)
        const date = new Date();
        const formattedDate =format(date,'EEEE MMM d')
        setWeather({ ...data, country, formattedDate })
        setError('')
      } catch (error) {
        // console.log(error)
        setError('City not found')
        setWeather(null)
      } finally {
        setLoading(false)
      }
    }
  

   useEffect(() => {
     fetchWeather("Bangkok"); // Default city
   }, []);
  
  return (
      <WeatherContext.Provider value={{city,setCity,weather,fetchWeather,error,loading}}>
          {children}
    </WeatherContext.Provider>
      
  )
}

export default ContextProvider