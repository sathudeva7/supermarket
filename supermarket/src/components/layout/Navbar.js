import React, {Component } from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Online Super Market</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link"></Link>
                    </li>
                   
                    <li className="navbar-item">
                        <Link to="/register" className="nav-link">Create User</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/dashboard" className="nav-link">Add products</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/viewproducts" className="nav-link">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                </ul>
                </div>
            </nav>
        )
    }
}