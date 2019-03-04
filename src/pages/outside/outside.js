import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Button } from 'reactstrap';
import axios from "axios";
import _ from "lodash";

class Outside extends Component {
    constructor(props) {
        super(props);

        this.getAddress = this.getAddress.bind(this);

        this.state = {
            longitude: null,
            latitude: null,
            openWeatherApiKey: '3ea28eee554fc9e1aa033a7bfc49af2a',
            openWeatherBaseUrl: 'https://api.openweathermap.org/data/2.5/weather?APPID=',
            googleBaseUrl: 'https://maps.googleapis.com/maps/api/geocode/json?address=',
            googleApiQuery: ',+CA&key=',
            googleApiKey: 'AIzaSyA93lTcWHYKNauKyPDBCIs39Cv4rr0b9cE',
            address: "",
            temperature: 0
        }
    }

    changeAddress(e) {

        console.log(e.currentTarget.value);
        this.setState({
            address: e.currentTarget.value
        })
        /*return (e) => {
            this.setState({
                address: e.currentTarget.value
            })
        }*/
    };
    getAddress() {

        axios.get(this.state.googleBaseUrl + this.state.address + this.state.googleApiQuery + this.state.googleApiKey)
            .then(response => {
                console.log(response);
                console.log(_.get(response, 'data.results[0].formatted_address', 'Address not found'));
                this.setState(
                    {
                        latitude: _.get(response, 'data.results[0].geometry.location.lat', 36.778261),
                        longitude: _.get(response, 'data.results[0].geometry.location.lng', -119.4179324)
                    }
                        );
                    console.log('Longitude: ' + this.state.longitude  + 'Latitude: ' + this.state.latitude);
                    this.getTemperature(this.state.latitude, this.state.longitude);

                    })
            .catch(error => {
                console.warn(error);
            });
    }

    getTemperature(lat, long) {

         axios.get(this.state.openWeatherBaseUrl + this.state.openWeatherApiKey + '&units=metric&lat=' + lat + '&lon=' + long)
             .then(response => {
                 console.log(_.get(response, 'data.main.temp', 0));
                 this.setState({temperature: response.data.main.temp});
             })



    }

    render() {
        return (
            <div>
                <h2>Outside Temperature</h2>
                <ul className="header">
                    <li> <NavLink to="/inside">Inside</NavLink> </li>
                </ul>

                <form>
                    <label>
                        Adress:
                        <input type="text" onChange={(e) => this.changeAddress(e)} />
                    </label>
                </form>

                <Button color="danger" onClick={this.getAddress}>Get Outside Temp Checker</Button>

                <p>Temperature: {this.state.temperature}</p>

            </div>
        )
    }
}

export default Outside;