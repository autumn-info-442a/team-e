import { React, Component } from 'react'
import { Typography, Paper, Grid, Container, Button, Card, CardActions, CardContent, CardMedia, Hidden, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { Row, Col, Tab, Tabs } from 'react-bootstrap';
import { ExpandMore } from '@material-ui/icons';
import { BlogPost } from "./BlogPost";
import { Redirect } from 'react-router-dom'
import { GetCookie } from '../GetCookie'
// shows details in the dashboard for individual groups
export class GroupDesc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'home',
        };
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        var auth = GetCookie("access_token")
        var groupId = this.props.location.pathname.split("/", 3)[2]
        this.getGroup(auth, groupId)
    }

    onClick() {
        this.setState({
            showBlog: true,
        });
    }

    handleChange(k) {
        this.setState({
            value: k,
        });
    };

    getGroup = (auth, groupId) => {
        setTimeout(() => {
            console.log(auth)
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

    // loads the group info about the group
    // gets group name as prop from Groups
    // shows edit and accept options if user is admin
    render() {
        if(this.state.data) {
        let cards = [1, 2, 3, 4];
        return (<div>
            <Container maxWidth="md">
                <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Group DESCRIPTION
                </Typography>
                < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
                <Paper variant="elevation" style={{ padding: "5px" }}>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={this.state.value}
                        onSelect={(k) => this.handleChange(k)}
                    >
                        <Tab eventKey="home" title="Group Description">
                            <Row>
                                <Col>
                            <div style={{ width: "100%", marginBottom: "10px" }} ><img style={{ maxWidth: "500px", maxHeight: "200px", display: "block" }} src="https://source.unsplash.com/random" /></div>
                            <Typography component="h5" variant="h5" align="left" color="textPrimary">
        {this.state.data.groupName}</Typography>
                            <Typography component="h5" variant="h5" align="left" color="textSecondary">
                                Members: X</Typography>
        <Typography variant="subtitle1" color="textPrimary">{this.state.data.createdAt}</Typography>
        <Typography variant="subtitle1" color="textPrimary">{this.state.data.groupDescription}</Typography></Col>
                            <Col> <Typography component="h5" variant="h5" align="left" color="textSecondary">
                                Comments</Typography>
                                {/* LOAD IN GROUP COMMENTS HERE */}
                                </Col>
                            </Row>
                        </Tab>
                        {/* MEMBER REQUESTS */}
                        <Tab eventKey="profile" title="Member Requests">
                            <Grid container spacing={4}>
                                {cards.map((card) => (
                                    <Grid item key={card} xs={4} sm={3} md={3}>
                                        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardMedia
                                                style={{ paddingTop: '56.25%' }}
                                                image="https://source.unsplash.com/random"
                                                title="Image title"
                                            />
                                            <CardContent style={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Name
                        </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={this.onClick}>
                                                    Accept
                        </Button>
                                                <Button size="small" color="primary" onClick={this.onClick}>
                                                    Reject
                        </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Tab>
                    </Tabs>
                </Paper>
            </Container>
        </div>
        );
        
        }

        return (<div>Loading...</div>)
    }
}