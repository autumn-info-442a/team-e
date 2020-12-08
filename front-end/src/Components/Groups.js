import { React, Component } from 'react'
import { GroupPage } from "./GroupPage";
import SearchBar from "material-ui-search-bar";
import { Typography, Grid, Container, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { Row } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom'
import { GetCookie } from "../GetCookie";
import NewGroup from './NewGroup';

// shows all groups within a selected category
export class Groups extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    var auth = GetCookie("access_token");
    this.searchGroups(auth, this.props.location.state.categoryId, 1, '');
    this.setState({
      auth: auth
    })
  }

  onSave(card) {
    console.log("CLICK CLICK", card);
    card.isSaved === true
      ? this.unsaveGroup(this.state.auth, card.groupId)
      : this.saveGroup(this.state.auth, card.groupId)
  }

  // returns the view for the groups page
  // loads list of groups - navigates to a group page if clicked on
  // shows group info as a pop up
  render() {
    return (<div>
      <Container maxWidth="md">
        <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
          {this.props.location.state.categoryName}
        </Typography>
        < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
        <Row className="w-100"><Button size="medium" color="primary" >
          <Link to={{
            pathname: '/',
            state: {
              auth: this.state.auth,
            }
          }}>Back</Link></Button>


          <div style={{ margin: "auto", width: "60%" }}>
            <SearchBar
              value={this.state.query}
              onChange={(newValue) => this.setState({ query: newValue })}
              onRequestSearch={() => this.searchGroups(this.state.auth, this.props.location.state.categoryId, 1, this.state.query)}
            />
          </div>
          <NewGroup />
        </Row>
      </Container>
      <Container style={{ padding: "3.5rem 0" }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {this.state.data != undefined && this.state.data.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  style={{ paddingTop: '56.25%' }}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.groupName}</Typography>
                  <Typography>
                    {card.groupDescription}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => this.onSave(card)}>
                    {card.isSaved === true ? "Unsave" : "Save"}</Button>
                  <Button ><Link to={{
                    pathname: '/group/' + card.groupId,
                    state: {
                      auth: this.state.auth,
                      groupId: card.groupId
                    }
                  }}>View </Link></Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
    );

  }

  createGroup = (auth, categoryId, groupName, groupDescription) => {
    var body =
    {
      "category": {
        "categoryId": categoryId
      },
      "groupName": groupName,
      "groupDescription": groupDescription
    }

    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups"
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        },
        body: body
      })
        .then((response) => {
          if (response.status <= 201) {
            response.json().then((data) => {
              console.log(data)
            })
          } else {
            console.log("failed :(", response.status)
          }
        })
    }, 0)
  }

  getGroup = (auth, groupId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId
      fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      })
        .then((response) => {
          if (response.status <= 201) {
            response.json().then((data) => {
              console.log(data)
            })
          } else {
            console.log("failed :(")
          }
        })
    }, 0)
  }

  saveGroup = (auth, groupId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/save"
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      })
        .then((response) => {
          if (response.status <= 201) {
            console.log("success")
          } else {
            console.log("failed :(", response.status)
          }
        })
    }, 0)
  }

  unsaveGroup = (auth, groupId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/save"
      fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      })
        .then((response) => {
          if (response.status <= 201) {
            console.log("success")
          } else {
            console.log("failed :(", response.status)
          }
        })
    }, 0)
  }

  searchGroups = (auth, categoryId, page, query) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/search?"
      if (categoryId !== '') {
        url = url + "category=" + categoryId
      }

      if (page !== '') {
        if (url.charAt(url.length - 1) !== '?' || url.charAt(url.length - 1) !== '&') {
          url = url + '&'
        }
        url = url + "page=" + page
      }

      if (query !== '') {
        if (url.charAt(url.length - 1) !== '?' || url.charAt(url.length - 1) !== '&') {
          url = url + '&'
        }
        url = url + "query=" + query
      }

      fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      })
        .then((response) => {
          if (response.status <= 201) {
            response.json().then((data) => {
              console.log("SEARCH", data)
              this.setState({
                data: data
              })
            })
          } else {
            console.log("failed :(")
          }
        })
    }, 0)
  }
}