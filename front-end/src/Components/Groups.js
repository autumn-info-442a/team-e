import { React, Component } from 'react'
import SearchBar from "material-ui-search-bar";
import { Typography, Grid, Container, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { GetCookie } from "../UtilityFunctions";
import NewGroup from './NewGroup';

// shows all groups within a selected category
export class Groups extends Component {

  constructor(props) {
    super(props);
    this.state = {
      auth: '',
      pagesShown: 1,
      query: '',
      moreDataToLoad: true
    };
  }

  componentDidMount() {
    var auth = GetCookie("access_token");
    this.setState({
      auth: auth
    })
    this.searchGroups(auth, this.props.location.state.categoryId, 1, '');
    window.addEventListener('scroll', this.loadMore);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.loadMore);
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
    if(this.state.data) {

    
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
          <NewGroup auth={this.state.auth} categoryId={this.props.location.state.categoryId}/>
        </Row>
      </Container>
      <Container style={{ padding: "3.5rem 0" }} maxWidth="md">
        <Grid container spacing={4}>
          {this.state.data != undefined && this.state.data.map((card) => (
            <Grid item key={card.groupId} xs={12} sm={6} md={4}>
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

    return null;
  }

  loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight && this.state.moreDataToLoad) {
      this.searchGroups(this.state.auth, this.props.location.state.categoryId, this.state.pagesShown + 1, this.state.query)
    }
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
              if (!this.state.data) {
                this.setState({
                  data: data
                })
              } else {
                var newData = this.state.data.concat(data)
                if (data < 1) {
                  this.setState({
                    moreDataToLoad: false
                  })
                } else {
                  this.setState({
                    data: newData,
                    pagesShown: this.state.pagesShown + 1 
                  })
                }
              }

            })
          } else {
            console.log("failed :(")
          }
        })
    }, 0)
  }
}