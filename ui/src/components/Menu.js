import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.scss';
import logo from '../imgs/SpaceX-Logo.png';

export class Menu extends Component {
    render() {
        return (
            <div className="menu-wrapper">
                <div className="menu">
                    <img src={logo} alt="SpaceX Logo" className="logo"/>
                    <ul className="menu-options">
                        <li><NavLink exact activeClassName="active" to={`/`}>Home</NavLink></li>
                        <li><NavLink activeClassName="active" to={`/launches`}>Missions</NavLink></li>
                        <li><NavLink activeClassName="active" to={`/vehicles`}>Vehicles</NavLink></li>
                        <li><NavLink activeClassName="active" to={`/about`}>About</NavLink></li>
                    </ul>
                </div>

            </div>
            
        )
    }
}

export default Menu
