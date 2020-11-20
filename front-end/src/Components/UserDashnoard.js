import { React, Component } from 'react'
import { Typography, Grid, Container, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

// loads info through userInfo function from User.js passed in as props
// userInfo returns an object with the user's joined and saved groups, posts and 
// comments they're made, which groups they're an admin of, and their login info
export class UserDashboard extends Component {

    // takes in the user info from the userInfo function from User.js 
    // loads users requesting to join groups that user is an admin of
    // input: userInfo object
    // output: list of groups (groupIDs) that user is an admin of with associated 
    //         list of members (userIDs) requesting to join the group
    // loadMemberRequestInfo(userInformation) {
    //     return listOfRequests;
    // }

    // // takes in the user info from the userInfo function from User.js and reorganizes
    // // it to be displayed for the dashboard
    // // input: userInfo object 
    // // output: none
    // loadInfo(userInformation) {

    // }

    // displays user's joined groups, saved groups, and groups they're admins of
    // also shows option to approve or reject group members for groups user is 
    // an admin for. 
    render() {
        let cards = [1, 2, 3, 4];

        return (<div>
            <Container maxWidth="lg">
                <Typography component="h2" align="center" variant="h2" color="textPrimary" gutterBottom>
                    Dashboard</Typography>
                < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
            </Container>
            <Container style={{ padding: "1.5rem 0" }} maxWidth="md">
                <Typography component="h5" align="left" variant="h5" color="textPrimary" style={{ paddingBottom: "10px" }}>
                    Admin Group Requests
                </Typography>
                {/* End hero unit */}
                <Grid container spacing={2}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={4} sm={3} md={3}>
                            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    style={{ paddingTop: '56.25%' }}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <CardContent style={{ flexGrow: 1 }}>
                                    <Typography variant="p" component="p">
                                        Person Name
                        </Typography>
                                    <Typography variant="p" component="p">
                                        Group Name
                        </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={this.onClick}>
                                        Accept
                        </Button>
                                    <Button size="small" color="primary" onClick={this.onClick}>
                                        Deny
                        </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            < hr style={{ margin: "1rem auto", backgroundColor: "#3399FF", width: "550px", height: "3px" }} />
            <Container style={{ padding: "1.5rem 0" }} maxWidth="md">
                <Typography component="h5" align="left" variant="h5" color="textPrimary" style={{ paddingBottom: "10px" }}>
                    Admin Groups
                </Typography>
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={6} sm={4} md={4}>
                            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    style={{ paddingTop: '56.25%' }}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <CardContent style={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Group Name
                        </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={this.onClick}>
                                        View
                        </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            < hr style={{ margin: "1rem auto", backgroundColor: "#3399FF", width: "550px", height: "3px" }} />
            <Container style={{ padding: "1.5rem 0" }} maxWidth="md">
                <Typography component="h5" align="left" variant="h5" color="textPrimary" style={{ paddingBottom: "10px" }}>
                    Joined Groups
                </Typography>
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={6} sm={4} md={4}>
                            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    style={{ paddingTop: '56.25%' }}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <CardContent style={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Group Name
                        </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={this.onClick}>
                                        View
                        </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            < hr style={{ margin: "1rem auto", backgroundColor: "#3399FF", width: "550px", height: "3px" }} />
            <Container style={{ padding: "1.5rem 0" }} maxWidth="md">
                <Typography component="h5" align="left" variant="h5" color="textPrimary" style={{ paddingBottom: "10px" }}>
                    Saved Groups
                </Typography>
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={6} sm={4} md={4}>
                            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia
                                    style={{ paddingTop: '56.25%' }}
                                    image="https://source.unsplash.com/random"
                                    title="Image title"
                                />
                                <CardContent style={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Group Name
                        </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={this.onClick}>
                                        View
                        </Button>
                                    <Button size="small" color="primary" onClick={this.onClick}>
                                        Unsave
                        </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
        );

    }

}