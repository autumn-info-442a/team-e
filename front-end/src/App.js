import React, { Component } from 'react';
import './App.css';
import { NavBar } from './Components/NavBar';
import { Categories } from "./Components/Categories";
import LogIn from "./Components/LogIn";
import { Container } from '@material-ui/core';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import { UserDashboard } from "./Components/UserDashnoard";
import { Groups } from './Components/Groups';
import { GroupPage } from "./Components/GroupPage";
import { BlogPost } from './Components/BlogPost';
import { GroupDesc } from './Components/GroupDesc';

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
              <Route path="/mystuff" component={UserDashboard} />
              <Route path="/groups" component={Groups} />
              <Route path="/grouppage" component={GroupPage} />
              <Route path="/blog" component={BlogPost} />
              <Route path="/groupdesc" component={GroupDesc} />
              {/*
            <Route path="/logout" component={Signout} /> */}
              <Redirect to="/" />
            </Switch>
          </>
          </Container>
        </main>
    )
  }
}

