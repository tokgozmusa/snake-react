import React, { Component } from 'react';
//import logo from './logo.svg';
import './style.css';
import Canvas from '../Canvas'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Snake - React</h1>
                </div>
                <br/>
                <Canvas/>
            </div>
        );
    }
}

export default App;
