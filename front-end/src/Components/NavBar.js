import { React, Component } from 'react'
import { Link } from '@material-ui/core'
// import { Categories } from "./Categories";
import { UserDashboard } from "./UserDashnoard";
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export class NavBar extends Component {

  //     // handles navigation changes
  //     // input: user selected page name via an event
  //     // output: returns the redirect request to the requested page 
  //     handleNav(event) {
  //         return pageNav;
  //     }

  // global navbar for website
  // redirects users to selected pages

  render() {
    return (
      <Navbar bg="light" variant="light">
      <Navbar.Brand>Explore</Navbar.Brand>
      <Nav className="ml-auto">
      <Nav.Link><NavLink to="/">Home</NavLink></Nav.Link>
        {/* <NavLink href="">My Groups</NavLink> */}
        <Nav.Link><NavLink to="/login">Log In</NavLink></Nav.Link>
      </Nav>
    </Navbar>
    );

  }
}