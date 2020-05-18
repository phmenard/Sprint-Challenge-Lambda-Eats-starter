import '../css/index.css';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'

import BuildPizza from './BuildPizza';

import { Route } from 'react-router-dom';

const MyBody = props => {

    return (

        <div className="mainContent">
            <Route exact path='/pizza'>
                <BuildPizza />
            </Route>
           

        </div>
    );
}

export default MyBody;