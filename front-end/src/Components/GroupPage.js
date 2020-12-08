import { React, Component } from 'react'
import { Typography, Grid, Container, Button, Card, CardActionArea, CardContent, CardMedia, Hidden, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { Row } from 'react-bootstrap';
import { ExpandMore } from '@material-ui/icons';
import { BlogPost } from "./BlogPost";
import { NewBlog } from "./NewBlog";
import { Redirect } from 'react-router-dom'
// shows a singular selected group page with posts
export class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showBlog: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            showBlog: true,
        });
    }

    // loads the group info about the group
    // gets group name as prop from Groups
    // shows edit and accept options if user is admin
    render() {
        let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (this.state.showBlog) {
            return (<BlogPost groupId={this.props.groupId}/>)
        }
        return (<div>
            <Container style={{ padding: "1rem 0" }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item xs={12} md={12}>
                            <CardActionArea component="a" href="#">
                                <Accordion square>
                                    <Card style={{ display: "flex" }}>
                                        <Hidden xsDown>
                                            <CardMedia style={{ width: 160 }} image="https://source.unsplash.com/random" title="TITLE" />
                                        </Hidden>
                                        <div style={{ flex: 1 }}>
                                            <CardContent>
                                                <Typography component="h2" variant="h5">
                                                    {/* {post.title} */}title</Typography>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {/* {post.date} */}date</Typography>
                                                <Typography variant="subtitle1" paragraph>
                                                    {/* {post.description} */} post post post post ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lob
                                                                </Typography>
                                                {/* <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                            <Button variant="primary">
                                                                Comments</Button></AccordionSummary> */}
                                                <Button variant="primary" onClick={this.onClick}>
                                                    Continue Reading...</Button>
                                            </CardContent>
                                        </div>
                                    </Card>
                                    <AccordionDetails>
                                        <Grid container spacing={1}>
                                            {cards.map((card) => (
                                                <Grid item xs={12} md={12}>
                                                    <Card style={{ display: "flex" }}>
                                                        <div style={{ flex: 1 }}>
                                                            <CardContent style={{ padding: "10px" }}>
                                                                <Typography component="p" variant="p">
                                                                    {/* {post.comment} */}comment comment comment</Typography>
                                                            </CardContent>
                                                        </div>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </CardActionArea>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
        );

    }
}