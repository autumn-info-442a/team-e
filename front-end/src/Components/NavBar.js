import { React, Component } from 'react'
import { Link } from '@material-ui/core'
// import { Categories } from "./Categories";
import { UserDashboard } from "./UserDashboard";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { GetCookie } from '../GetCookie'
import '../css/NavBar.css'

export class NavBar extends Component {

  //     // handles navigation changes
  //     // input: user selected page name via an event
  //     // output: returns the redirect request to the requested page 
  //     handleNav(event) {
  //         return pageNav;
  //     }

  // global navbar for website
  // redirects users to selected pages

  constructor (props) {
    super(props)

    this.state = {
      loggedIn: false
    }
    this.loggedInterval = ""
  }

  componentDidMount() {
    window.onload = this.updateLoggedState;
    document.onmousemove = this.updateLoggedState;
  }

  updateLoggedState = () => {
    var auth = GetCookie("access_token")
    if (auth !== '') {
      this.setState({
        loggedIn: true
      })
    } else {
      this.setState({
        loggedIn: false
      })
    }
  }

  logOut = () => {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.setState({
      loggedIn: false
    })

    //change once hosted
    if (window.location.href != 'http://localhost:3000/') {
       window.location.href = '/'
    }    
}

  render() {
    return (
      <Navbar className="color-nav" variant="light">
        <Container className = "navcontainer">

        <Navbar.Brand href = '/'>Explore</Navbar.Brand>
        
        <Nav className="ml-auto">
        <Nav.Link><NavLink to="/">Home</NavLink></Nav.Link>
        {this.state.loggedIn ? <Nav.Link><NavLink to="/dashboard">My Groups</NavLink></Nav.Link> : null}
          {this.state.loggedIn ?
            <Button id = "logout" variant= "link" onClick={() => this.logOut()}>Logout</Button> :
            <Nav.Link><NavLink to="/authenticate">Log In</NavLink></Nav.Link>
          }
        </Nav>
        </Container>
      </Navbar>
    );

  }
}
