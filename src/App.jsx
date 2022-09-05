import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import font1 from "./img/font1.jpg"

function App() {

  const [coords, setCoords] = useState()

  useEffect(() => {
    const success = pos => {
      const lonlat = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(lonlat)
    }
    navigator.geolocation.getCurrentPosition(success)

  }, [])

  return (
    <div className="App" style={{ 
      background: `url(${font1})`,
      backgroundSize: 'cover'
      }}>
      <Card lon={coords?.lon} lat={coords?.lat} />
    </div>
  )
}

export default App
