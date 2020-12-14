import { React, Component } from 'react';
import { Typography, Paper, Container, Button, TextareaAutosize } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Row, Col } from "react-bootstrap";
import { GetCookie, toJSDate, timeSince } from "../UtilityFunctions";
import BlogComments from "./BlogComments";

export class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: ''
    };
  }

  componentDidMount() {
    console.log(this.props.location.state)
    var auth = GetCookie("access_token");
    this.setState({
      auth: auth,
      blogPost: this.props.location.state.blogPost,
      groupData: this.props.location.state.data
    })
  }

  handleNewBlogCommentChange = (event) => {
    this.setState({
      newComment: event.target.value
    })
  };

  clickSubmitHandler() {
    if (this.state.newComment.length < 1) {
      this.setState({
        showError: true,
        errorMessage: 'Empty comment'
      })
    } else if (this.state.newComment.length > 100) {
      this.setState({
        showError: true,
        errorMessage: 'Comment must be under 100 characters'
      })
    } else {
      this.createBlogComment(this.state.auth, this.state.groupData.groupId, this.state.blogPost.blogPostId, this.state.newComment, 0)
    }
  }


  render() {
    const ErrorAlert = () => {
      if (this.state.showError === true) {
        return (
          <Alert style={{ float: "right" }} severity="error" onClose={() => this.removeAlert()} dismissible>
            {this.state.errorMessage}
          </Alert>
        )
      } else {
        return null
      }
    }

    if (this.state.blogPost && this.state.groupData) {    
      return (<div>
          <Container maxWidth="md">
            <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
              {this.state.blogPost.postTitle}
              </Typography>
            < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
            <Paper variant="elevation" style={{padding: "5px"}}>
            <div style={{width:"100%", marginBottom: "10px"}} ><img style={{ maxHeight: "400px", marginLeft: "auto", marginRight: "auto", display: "block"}} src="https://source.unsplash.com/random" /></div>
            <Typography  variant="subtitle1" align="center">
            Created by {this.state.blogPost.user.firstName} {this.state.blogPost.user.lastName} <time class="timeago" dateTime={toJSDate(this.state.blogPost.createdAt)} title={toJSDate(this.state.blogPost.createdAt)}>{timeSince(toJSDate(this.state.blogPost.createdAt))}</time> ago
              </Typography>
            <Typography variant="subtitle1" color="textPrimary">
              {this.state.blogPost.postContent}
            </Typography>
          <Row>
            <Col>
              <br></br>
              {this.state.auth !== ''? 
              <div>
              <Typography variant="subtitle1" color="textPrimary">
                Leave a comment
                </Typography>
              <TextareaAutosize style={{ width: "100%" }} label="top level comment" rowsMin={3} onChange={this.handleNewBlogCommentChange} />
              <Button style={{ marginBottom: "15px" }} size="medium" color="primary" onClick={() => this.clickSubmitHandler()}>Create Comment</Button>
              <ErrorAlert></ErrorAlert>
              <hr
                style={{
                  marginTop: "-10px",
                }}
              />
              </div> : null }
              <Typography
                component="h6"
                variant="h6"
                align="left"
                color="textSecondary"
              >
                Comments
                </Typography>
              <hr
                style={{
                  marginTop: "5px",
                  width: "100%",
                  marginBottom: "2px"
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <BlogComments isAdmin={this.state.groupData.isAdmin} auth={this.state.auth} blogPost={this.state.blogPost} groupData={this.state.groupData} />
            </Col>
          </Row>
          </Paper>
          </Container>
        </div>
      );
    }

    return null;
  }

  createBlogComment = (auth, groupId, blogId, commentContent, replyId) => {
    setTimeout(() => {
      if (replyId > 0) {
        var body =
        {
          "replyId": {
            "Int64": replyId,
            "Valid": true
          },
          "commentContent": commentContent
        }
      } else {
        var body =
        {
          "commentContent": commentContent
        }
      }

      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/blog/" + blogId + "/comments"
      console.log(url)
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        },
        body: JSON.stringify(body)
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
}



