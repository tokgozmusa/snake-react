import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.css';

class PageNotFound extends Component {
    render() {
        return (
            <div>
                <h1>Sorry, page not found</h1>
                <div>
                    <Link to="/">Home</Link>
                </div>
            </div>
        );
    }
}

export default PageNotFound;
