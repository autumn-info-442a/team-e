import { React, Component } from 'react'
import { GroupPage } from "./GroupPage";
import { Search } from './SearchBar';
import { Typography, Grid, Container, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { Row } from 'react-bootstrap';
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

        return (
            this.state.showGroupPage ?
            <GroupPage /> :
         ( <div>
                <Container maxWidth="sm">
                    <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Groups Page (Category Name)
                </Typography>
                    < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
                    <Row className="w-100"><Button size="medium" color="primary" >
                        Back</Button><Search />
                        <Button size="medium" color="primary" >
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
        ));

    }

}