import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import { Button } from 'reactstrap';
import axios from 'axios';
import _ from 'lodash';

class Inside extends Component {

    constructor(props) {
        super(props);

        //this.findLocation = this.findLocation.bind(this);
        //this.clickLocation = this.clickLocation.bind(this);
        this.state = {
            longitude: null,
            latitude: null,
            openWeatherApiKey: '3ea28eee554fc9e1aa033a7bfc49af2a',
            openWeatherBaseUrl: 'https://api.openweathermap.org/data/2.5/weather?APPID=',
            insideTemp: null
        }
    }

    findLocation = () => {
        return new Promise((resolve, reject) => {
            const geolocation = navigator.geolocation;

            geolocation.getCurrentPosition((position) => {
                resolve(position);
            }, () => {
                reject(new Error('No location'));
            });
        })
    };

    clickLocation() {
        this.findLocation()
            .then(data => {
                console.log(data);
                this.setState({longitude: data.coords.longitude});
                this.setState({latitude: data.coords.latitude});


                this.getTemperature();
            })
            .catch(error => {
                console.warn(error);
            })
    }

    getTemperature() {
        axios.get(this.state.openWeatherBaseUrl + this.state.openWeatherApiKey + '&units=metric&lat='+ this.state.latitude +'&lon='+ this.state.longitude)
            .then(response => {
                console.log(response);
                console.log(_.get(response, 'data.main.temp', 0));
                this.setState({insideTemp: response.data.main.temp});
            })
    }

    render() {
        return (
            <div>
                <h2>Inside Temperature</h2>

                <ul className="header">
                    <li> <NavLink to="/outside">Outside</NavLink> </li>
                </ul>

                <Button color="danger" onClick={this.clickLocation}> Get Inside Temp</Button>

                <p>Temperature: {this.state.insideTemp}</p>

            </div>
        )
    }
}

export default Inside;