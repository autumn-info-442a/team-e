import { React, Component } from "react";
import {
  Typography,
  Grid,
  Container,
  Button,
  Card,
  CardContent,
  CardMedia,
  Hidden,
} from "@material-ui/core";
import { Link } from 'react-router-dom'
import { GetCookie, toJSDate, timeSince } from "../UtilityFunctions";
import { NewBlog } from "./NewBlog";


// shows all blog posts as cards
export class BlogCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBlog: false,
    };
  }

  componentDidMount() {
    var auth = GetCookie("access_token");
    this.getBlogPosts(auth, this.props.groupId)
    console.log(this.props.data)
  }

  getBlogPosts = (auth, groupId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/blog"

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
              this.setState({
                blogs: data
              })
              console.log(data)
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
    if(this.state.blogs) {
      return (
        <div>
          <Container style={{ padding: "1rem 0" }} maxWidth="md">
          <NewBlog
                   groupId={this.props.groupId}
                   data = {this.props.data}
                  />
            {this.state.blogs.length > 0 ? 
            <Grid container spacing={4}>
              {this.state.blogs.map((blogPost) => (
                <Grid item xs={12} md={12}>
                      <Card style={{ display: "flex" }}>
                        <Hidden xsDown>
                          <CardMedia
                            style={{ width: 160 }}
                            image="https://source.unsplash.com/random"
                            title="TITLE"
                          />
                        </Hidden>
                        <div style={{ flex: 1 }}>
                          <CardContent>
                            <Typography component="h2" variant="h5">
                              {blogPost.postTitle}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            Created by {blogPost.user.firstName} {blogPost.user.lastName} <time class="timeago" dateTime={toJSDate(blogPost.createdAt)} title={toJSDate(blogPost.createdAt)}>{timeSince(toJSDate(blogPost.createdAt))}</time> ago
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                               {blogPost.postContent}
                            </Typography>
                            <Button ><Link to={{
                                  pathname: '/blog/' + blogPost.blogPostId,
                                  state: {
                                    groupId: this.props.groupId,
                                    data: this.props.data,
                                    blogPost: blogPost,
                                  }
                                }}>Continue Reading...</Link>
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                </Grid>
              ))}
            </Grid> : <bold>No blog posts yet...</bold>}
          </Container>
        </div>
      );
    }
    return null;
  }
}
