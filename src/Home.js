import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
const Home = () => {

const[name,setName] = useState('')
const[error,setError] = useState('')
    const[data,setData] = useState({
        celcius:10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: 'https://cdn.icon-icons.com/icons2/2505/PNG/512/sunny_weather_icon_150663.png'
    })


    const handleClick = () =>
    {
        if(name!== "")
        {
            const API_URL =`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=a55492a48fca738e3d6f0bc2271d667d&units=metric`;
        axios.get(API_URL)
        .then(res => {
            let imgPath = '';
            if(res.data.weather[0].main === "Clouds")
            {
                imgPath = "https://th.bing.com/th/id/R.c2508193965382bc04cadd11d28a1b41?rik=aACjT8CLQpcNuQ&riu=http%3a%2f%2ficons.iconarchive.com%2ficons%2fcustom-icon-design%2fpretty-office-12%2f512%2fcloud-icon.png&ehk=7MxEzS%2bj%2fpbZpZltP834O%2fVMI5ch2PKG%2fQytbNiJODI%3d&risl=&pid=ImgRaw&r=0"
            }
            else if(res.data.weather[0].main === "Clear") {
                imgPath = "https://cdn1.iconfinder.com/data/icons/weather-set2-2/64/Clear-1024.png"
            }
            else if(res.data.weather[0].main === "Rain") {
                imgPath = "https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-1024.png"
            }
            else if(res.data.weather[0].main === "Drizzle") {
                imgPath = "https://cdn3.iconfinder.com/data/icons/weather-glyph-17/64/drizzle_weather_forecast_climate_sky_cloud-512.png"
            }
            else if(res.data.weather[0].main === "Mist") {
                imgPath = "https://cdn1.iconfinder.com/data/icons/weather-filled-9/614/12_-_Mist-512.png"
            }
            else {
                imgPath = "https://cdn.icon-icons.com/icons2/2505/PNG/512/sunny_weather_icon_150663.png"
            }
            setData({...data, celcius:res.data.main.temp, name:res.data.name,
            humidity:res.data.main.humidity, speed:res.data.wind.speed , image:imgPath})
            setError('');
        })
        .catch(err => {
            if(err.response.status === 404) {
                setError("Invalid City Name!")
            }
            else {
                setError('');
            }
            console.log(err)
        
        });

        }
    }

  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input placeholder='Enter City Name' type='text' onChange={(e) => setName(e.target.value)}></input>
                <button ><img src="https://img.uxwing.com/wp-content/themes/uxwing/download/user-interface/search-icon.png" onClick={handleClick} alt="" /></button>
            </div>
            <div className='error'>
                <p>{error}</p>
            </div>
            <div className='cloud'>
                <img src= {data.image} alt=""/>
                <h1>{Math.round(data.celcius)}°c</h1>
                <h2>{data.name}</h2>
                <div className='detail'>
                    <div className='col'>
                        <img src="https://cdn.onlinewebfonts.com/svg/img_541532.png" alt=""/>
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='col'>
                        <img src="https://th.bing.com/th/id/R.66311dacadc2e6e597ae2a2102468a10?rik=jiK65QvrdhNw2A&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_568683.png&ehk=Pb%2frt2T9CeA8g3CahvCq%2bGiGztK98avkAFOOlE3J4ZQ%3d&risl=&pid=ImgRaw&r=0" alt=""/>
                        <div className='wind'>
                            <p>{Math.round(data.speed)} km/hr</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
