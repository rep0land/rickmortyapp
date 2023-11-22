
import { useEffect, useRef, useState } from 'react'
import './App.css'
import UseFetch from './hooks/useFetch'
import InfoLocation from './components/InfoLocation'
import CardResidents from './components/CardResidents'

function App() {

  const [locationId, setLocationId] = useState(Math.floor(Math.random() * 126) + 1)

  const url = `https://rickandmortyapi.com/api/location/${locationId}`
  const [location, getLocation, isLoading, hasError] = UseFetch(url)

  useEffect(() => {
    getLocation()
  }, [locationId])

  const inputLocation = useRef()

  const handleLocation = e => {
    e.preventDefault()
    setLocationId(inputLocation.current.value.trim())
  }


  return (
    
      <div className='app'>
       <h1> <img className='app__img' src="https://pa1.aminoapps.com/6547/d1ce36294202443c21e73c391cb7ab3e818a500b_00.gif" alt="" /> </h1>
       <form className='app__form' onSubmit={handleLocation}>
        <input className='app_input' ref={inputLocation} type="text" />
        <button className='app__btn' >Search</button>
      </form>
      {
        isLoading
        ? <h2>Loading...</h2>
        : (
          hasError || locationId === '0'
          ? <h2>Hey! you most provide an id from 1 to 126</h2>
          : (
            <>
            <InfoLocation
            location={location}/>
            <div className='app__card-container'>
             {
               location?.residents.map(url => (
                 <CardResidents
                  key={url}
                  url={url}
                 />
               ))
             }
     
            </div>
            </>
          )
        )
       }
      </div>
  )
}

export default App
