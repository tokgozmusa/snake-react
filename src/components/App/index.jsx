import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    Snake will move here soon :)
                </p>
                <div>
                    Travis-CI -> Auto deploy to Heroku and Surge - v14
                </div>
            </div>
        );
    }
}

export default App;
