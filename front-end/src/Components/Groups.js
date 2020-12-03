import { React, Component } from 'react'
import { GroupPage } from "./GroupPage";
import { Search } from './SearchBar';
import { Typography, Grid, Container, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

// shows all groups within a selected category
export class Groups extends Component {

    // // loads the groups to display for the user based on the selected category
    // // inputs: category selected - comes from Categories and is passed in as a prop
    // // outputs: list of groups to display
    // groupLoader(selectedCategory) {
    //     return listOfGroups;
    // }

    // // searches for groups that match the entered search phrase
    // // input: search string
    // // output: list of categories that match the phrase
    // groupSearch(search) {
    //     return listOfSearchedGroups;
    // }

    // // creates a new group on the backend - all information should be validated before the group is created
    // // input: form information to create the group along with user's ID
    // // output: a request to the server to create the new group
    // createGroup(newGroupFormInfo, user) {
    //     validateInfo(newGroupFormInfo) // validates that all the user info entered is correct

    // }

    // // lets user delete a group only if the user is the admin
    // // input: group ID for the group being deleted and user ID
    // // output: a request to the backend to delete a group 
    // deleteGroup(groupID, userID) {

    // }

    // // adds group to user's groups
    // // input: user ID and group ID
    // // output: request to server to add group to user's groups
    // joinGroup(groupID, userID) {

    // }

    // // removes group to user's groups
    // // input: user ID and group ID
    // // output: request to server to delete group from user's groups
    // leaveGroup(groupID, userID) {

    // }

    // // loads all the information associated with a group
    // // input: group id
    // // output: group info
    // groupInfo(groupID) {
    //     return groupInfo;
    // }

    constructor(props) {
        super(props);
        this.state = {
            showGroupPage: false,
        };
        this.onClick = this.onClick.bind(this);
      }

      componentDidMount() {
        this.getGroup();
      }
    
      onClick() {
        this.setState({
          showGroupPage: true,
        });
      }

    // returns the view for the groups page
    // loads list of groups - navigates to a group page if clicked on
    // shows group info as a pop up
    render() {
        let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (this.state.showGroupPage) {
            return (<Redirect to="/grouppage" />)
    }
    
        return ( <div>
                <Container maxWidth="md">
                    <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Groups (Category Name)
                </Typography>
                    < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
                    <Row className="w-100"><Button size="medium" color="primary" >
                        Back</Button><div style={{margin: "auto", width: "60%"}}><Search /></div>
                        <Button size="medium" color="primary">
                        Create Group</Button>
                        </Row>
                </Container>
                <Container style={{ padding: "3.5rem 0" }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardMedia
                                        style={{ paddingTop: '56.25%' }}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent style={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Group Name</Typography>
                                        <Typography>
                                            Group Desc</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Save</Button>
                                        <Button size="small" color="primary" onClick={this.onClick}>
                                            Join</Button>
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
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId
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
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId
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
        if (url.charAt(url.length - 1) === '?' || url.charAt(url.length - 1) === '&') {
          url = url + '&'
        }
        url = url + "page=" + page
      }

      if (query !== '') {
        if (url.charAt(url.length - 1) === '?' || url.charAt(url.length - 1) === '&') {
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
              console.log(data)
            })
          } else {
            console.log("failed :(")
          }
        })
    }, 0)
  }
}