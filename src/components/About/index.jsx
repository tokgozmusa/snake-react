import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.css';

class About extends Component {
    render() {
        return (
            <div>
                <h1>About</h1>
                <div>
                    <Link to="/">Home</Link>
                </div>
            </div>

        );
    }
}

export default About;
