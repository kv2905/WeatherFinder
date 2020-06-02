import React from "react";
import Titles from "./Components/Titles.js";
import Forms from "./Components/Forms.js";
import Weather from "./Components/Weather.js";

const API_KEY = "26d7150dfadeff85e33738abf5949b00";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},%20${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    if(data.cod === "404") {
        this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter valid city values"
      });
    }

    else if(city && country) {
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }

    else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values"
      });
    }
  }


  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
              <div className="row">
                <div className="col-sm-6 title-container">
                  <Titles />
                </div>
                <div className="col-sm-6 form-container">
                  <Forms getWeather={this.getWeather} />
                  <Weather 
                    temp={this.state.temp} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  }
};


export default App;