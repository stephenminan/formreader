import React from 'react'
import { Link } from 'react-router-dom';


export const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to='/'>
                    <i className="fas fa-file-invoice"></i> Board Report
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar