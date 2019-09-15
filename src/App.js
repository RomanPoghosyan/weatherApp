import React from 'react';
import Info from './components/info'
import Weather from './components/weather';
import Form from './components/form';

const APY_KEY = '52d1829b1a8d32c887c02c0ea006f830';

class App extends React.Component{
    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        preasure: undefined,
        sunset: undefined,
        error: undefined,
    }
    gettingWeather = async (e) => {
        e.preventDefault();
        var city = e.target.elements.city.value;

        if(city){
            try {

                const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APY_KEY}&units=metric`);
                const api_data = await api_url.json();
                console.log(api_data);
                let sunset = new Date(api_data.sys.sunset);
                let sunset_time = `${sunset.getHours()} : ${sunset.getMinutes()} : ${sunset.getSeconds()}`

                this.setState({
                    temp: api_data.main.temp,
                    city: api_data.name,
                    country: api_data.sys.country,
                    pressure: api_data.main.pressure,
                    sunset: sunset_time,
                    error: undefined,
                })

            } catch(err) {

                this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    preasure: undefined,
                    sunset: undefined,
                    error: `'${city}' is not a city`,
                })

            }

        }else{
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                preasure: undefined,
                sunset: undefined,
                error: 'Enter city',
            })
        }
    }
    render(){
        return(
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info />
                            </div>
                            <div className="col-sm-7 form">
                                <Form weatherMethod={this.gettingWeather}/>
                                <Weather
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    pressure={this.state.pressure}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;