import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

import departamentos from './Departamentos'
import nome from "./nome"
import App from './App';
ReactDOM.render(
    <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} component={App}/>
                    <Route path="/departamentos" component={departamentos}/>
                    <Route path="/nome" component={nome}/>
                </Switch>
            </BrowserRouter>
    , document.getElementById('root')
);