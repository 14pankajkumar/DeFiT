import React from 'react'
import { Link } from 'react-router-dom'
import './App.css';

function Home() {

    const coordinates = []

    const start = () => {
        navigator.geolocation.watchPosition(
            data => {
                console.log(data);
                coordinates.push([data.coords.latitude, data.coords.longitude]);
                window.localStorage.setItem("coordinates", JSON.stringify(coordinates));
                document.getElementById("geoDataTime").innerHTML = "Time " + data.timestamp
                document.getElementById("geoDataSpeed").innerHTML = "Speed " + data.coords.speed
                document.getElementById("geoDataDistance").innerHTML = "Distance " + parseFloat(data.coords.speed % data.timestamp)
            },
            error => console.log(error),
            {
                enableHighAccuracy: true
            }
        )
    }

    return (
        <div className="App">
            <h1>
            <Link to="/" className="portis-button">Home</Link>
            </h1>
            <h1>
            <button onClick={() => start()} className="portis-button">Start</button>
            <button className="portis-button">Stop</button>
            </h1>
            <button className="portis-button">Log into Google Fit</button>
            <Link to="/signinportis" className="portis-button">Go to Wallet</Link>
            <h1 id="geoDataTime">Time 0</h1>
            <h1 id="geoDataSpeed">Speed 0</h1>
            <h1 id="geoDataDistance">Distance 0</h1>
        </div>
    )
}
export default Home
