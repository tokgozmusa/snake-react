import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './logo.svg';
import './style.css';

class Home extends Component {
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
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/about">About</Link>
                </div>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Home;
