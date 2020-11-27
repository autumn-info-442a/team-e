import { React, Component } from 'react'
import { Typography, Grid, Container, Button, Card, CardActionArea, CardContent, CardMedia, Hidden, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { Row } from 'react-bootstrap';
import { ExpandMore } from '@material-ui/icons';
import { BlogPost } from "./BlogPost";
import { Redirect } from 'react-router-dom'
// shows a singular selected group page with posts
export class GroupPage extends Component {

    // loads all the blog posts made in that group
    // // input: takes in the ID of the group - is passed this in as a prop from Groups
    // // output: returns list of posts made on the group
    // postLoader(groupID) {
    //     return listOfPosts;
    // }

    // // creates a new blog post
    // // input: form content for the new blog post along with the user ID
    // // output: a request to the backend to create a new blog post 
    // createPost(newPostFormContent, userID) {
    //     return createdPost;
    // }

    // // lets user delete blog post only if the user made the post or is the admin
    // // input: post ID for the post being deleted and user ID
    // // output: a request to the backend to delete a blog post 
    // deletePost(postID, userID) {
    // }

    // // loads all the comments made in that post
    // // input: takes in the ID of the post 
    // // output: returns list of comments made on the post
    // commentsLoader(postID) {
    //     return listOfComments;
    // }

    // // creates a new comment
    // // input: form content for the new comment along with the user ID
    // // output: a request to the backend to create a new comment
    // createComment(newCommentFormContent, userID) {
    //     return createdComment;
    // }

    // // lets user delete comment only if the user made the comment or is the admin
    // // input: post ID + comment ID for the post being deleted and user ID
    // // output: a request to the backend to delete a comment 
    // deleteComment(postID, commentID, userID) {
    // }

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
                return (<Redirect to="/blog" />)
        }
        return (<div>
                    <Container maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Group BLOGS
                </Typography>
                        < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
                        <Row className="w-100"><Button size="medium" color="primary" >
                            Back</Button>
                            <Button size="medium" color="primary" className="ml-auto">
                                Create Group</Button>
                        </Row>
                    </Container>
                    <Container style={{ padding: "3.5rem 0" }} maxWidth="md">
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
                                                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                            <Button variant="primary">
                                                                Comments</Button></AccordionSummary>
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