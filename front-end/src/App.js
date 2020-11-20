import React, { Component } from 'react';
import './App.css';
import { NavBar } from './Components/NavBar';
import { Categories } from "./Components/Categories";
import LogIn from "./Components/LogIn";
import { Container } from '@material-ui/core';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';


export default class App extends Component {
  render() {
    return (
        <main>
           <Container maxWidth={false}>
          <>
            <NavBar />
            <Switch>
              <Route exact path='/' component={Categories} />
              <Route path='/login' component={LogIn} />
              {/*<Route path="/signin" component={Sign} />
            <Route path="/mystuff" component={Dashboard} />
            <Route path="/logout" component={Signout} /> */}
              <Redirect to="/" />
            </Switch>
          </>
          </Container>
        </main>
    )
  }
}

