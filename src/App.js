import React, { Component } from 'react';
import logo from './logo.svg';
import {Switch, Route, HashRouter, NavLink} from 'react-router-dom'
import './App.css';

import Inside from './pages/inside/inside'
import Outside from './pages/outside/outside'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

        </header>

          <HashRouter>
              <div className="App container">

                  <h1>Temperature Checker</h1>

                      <div className="content">

                          <li> <NavLink to="/outside">Outside</NavLink> </li>

                          <Switch>
                          <Route exact path="/inside" component={Inside}/>
                          <Route path="/outside" component={Outside}/>
                      </Switch>
                  </div>
              </div>
          </HashRouter>


      </div>
    );
  }
}

export default App;