import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';
import logo from '../imgs/SpaceX-Logo.png';

export class Menu extends Component {
    render() {
        return (
            <div className="menu-wrapper">
                <div className="menu">
                    <img src={logo} alt="SpaceX Logo" className="logo"/>
                    <ul className="menu-options">
                        <li><Link to={`/`}>Home</Link></li>
                        <li><Link to={`/launches`}>Missions</Link></li>
                        <li><Link to={`/vehicles`}>Vehicles</Link></li>
                        <li><Link to={`/about`}>About</Link></li>
                    </ul>
                </div>

            </div>
            
        )
    }
}

export default Menu
