import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import { Button } from 'reactstrap';

class Outside extends Component {

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
                        <input type="text" name="adress" />
                    </label>
                </form>

                <Button color="danger">Get Outside Temp Checker</Button>

                <p>Temperature: </p>

            </div>
        )
    }
}

export default Outside;