import React from 'react';
import UserLocation from './components/UserLocation.js';
import Navbar from './components/Navbar.js'
import './App.css';
import Axios from 'axios';

class App extends React.Component {

  
  state = {
    userPosition: {
      latitude: 45,
      longitude: 45
    },
    weather: {},
    regionInput: ""
  }

  componentDidMount() {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        
        let pos = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState({ userPosition: pos });

        
        Axios.get(`http://api.weatherstack.com/current?access_key=ee2c00a09ba65e4467143d28625d3fa2&query=${this.state.userPosition.latitude},${this.state.userPosition.longitude}`).then(res => {

          let userWeather = {
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }
          console.log(userWeather);
          this.setState({ weather: userWeather });
        })
      })
    }
  }

  
  changeRegion = (value) => {
    this.setState({ regionInput: value })
  }

  
  changeLocation = (e) => {

    e.preventDefault()

    Axios.get(`http://api.weatherstack.com/current?access_key=ee2c00a09ba65e4467143d28625d3fa2&query=${this.state.regionInput}`).then(res => {

      let userWeather = {
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons
      }
      console.log(userWeather);
      this.setState({ weather: userWeather });

    })
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Navbar changeRegion={this.changeRegion} changeLocation={this.changeLocation} />
          <UserLocation weather={this.state.weather} />
        </div>
      </div>
    );
  }
}

export default App;
