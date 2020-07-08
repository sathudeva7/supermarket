import React, {Component } from 'react';
import {Link} from 'react-router-dom';

export default class Navbaruser extends Component{

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand"></Link><p>Online Super Market</p>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link"></Link>
                    </li>
                   
                    
                  
                    <li className="navbar-item">
                        <Link to="/viewproducts" className="nav-link">Home</Link>
                    </li>
                   
                    
                
                </ul>
                </div>
            </nav>
        )
    }
}