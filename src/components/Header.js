import '../css/index.css';

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'

const Header = props => {

    console.log(window.location.pathname);
    return (

        <header>
            <h3>Lambda Eats</h3>

            <Link to="/pizza">
                <div className="button">Build Pizza</div>

            </Link>
            <Link to="/" >
                <div className="button">Home</div>

            </Link>
        </header>

    );


}

export default Header;