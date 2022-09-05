import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Loading from './Loading'

const Card = ({ lat, lon }) => {
    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isTemp, setIsTemp] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (lon && lat) {
            const APIKey = "081b9b25949eab31306552737f899918"
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

            axios.get(URL)

                .then(res => {
                    setWeather(res.data)
                    const temp = {
                        celsius: `${(res.data.main.temp - 273.15).toFixed(2)} °C`,
                        farenheit: `${((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2)} °F`
                    }
                    setTemperature(temp)
                    setLoading(false)
                })
                .catch(err => console.log(err.message))
        }
    }, [lat, lon])

    const handleClick = () => setIsTemp(!isTemp)

    console.log(weather)

    if (loading) {
        return <Loading />
    } else {
        return (
            <article className='card'>
                <h1>Weather App</h1>
                <h2>{`${weather?.name}, ${weather?.sys.country}`}</h2>
                <div className='container'>
                    <div className='container__img' >
                        <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt={`${weather?.name}, ${weather?.sys.country}`} ></img>
                        <h3>{isTemp ? temperature?.celsius : temperature?.farenheit}</h3>
                    </div>
                    <div className='text'>
                        <h3>&#34;{`${weather?.weather[0].description} ${weather?.weather[0].main}`}&#34;</h3>
                        <div className='container__img-icons'>
                            <ul>
                                <i className="fa-solid fa-wind"></i>
                                <li><span>Wind speed:</span>{`${weather?.wind.speed} m/s`}</li>

                                <i className="fa-solid fa-cloud"></i>
                                <li><span>Clouds:</span>{`${weather?.clouds.all}`} &#37;</li>

                                <i className="fa-solid fa-temperature-three-quarters"></i>
                                <li><span>Pressure:</span>{`${weather?.main.pressure} mb`}</li>
                            </ul>
                        </div>
                        <button className='btn' onClick={handleClick}>{isTemp ? "Change to °F" : "Change to °C"}</button>
                    </div>
                </div>
            </article>
        )
    }
}

export default Card