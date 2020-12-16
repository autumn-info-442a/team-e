import React from "react";
import { Typography, Container, Button, Dialog, DialogContent, CardContent} from "@material-ui/core";
import { toJSDate, timeSince } from "../UtilityFunctions";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { Row, Col } from "react-bootstrap";

export class BlogComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      showModal: false
    };
  }

  handleDelete(blogCommentId) {
    this.setState({
      showModal: true,
      blogCommentId: blogCommentId
     })
  }

  clickSubmitHandler() {
    this.deleteBlogComment(this.props.auth, this.props.groupId, this.props.blogPost.blogPostId, this.state.blogCommentId)
    this.setState({
      showModal: false,
      blogCommentId: ''
     })
  }

  render() {
    return (
      <div>
              {<Dialog 
              open={this.state.showModal}
              onClose={() => this.setState({ showModal: false })}
              aria-labelledby="Delete Comment"
              aria-describedby="simple-modal-description"
            >
            <DialogContent>
               <Container maxWidth="lg">
              <Typography component="h5" align="center" variant="h5" color="textPrimary" gutterBottom>
              Are you sure you want to delete this comment?
              </Typography>
              <Button style={{marginLeft: "auto"}} id="delete" variant= "dark" size= "sm" onClick={() => this.clickSubmitHandler()}>Confirm</Button>
              </Container>
              </DialogContent>
              </Dialog > }
        {this.props.commentData  && this.props.commentData.length > 0 ? (
          <div>
            {this.props.commentData.map((card) => (
              <CardContent key={card.blogCommentId}
                style={{ padding: "5px", borderBottom: "0.5px solid #ebebeb" }}
              >
                <Row>
                  <Col xs={10}>
                  {!card.deleted ? <Typography
                  component="p"
                  variant="p"
                  style={{ fontSize: "15px" }}
                >
                  {card.commentContent}
                  </Typography> : <Typography
                  component="p"
                  variant="p"
                  style={{ fontSize: "15px", color:"#e34949" }}
                >
                  Comment deleted
                  </Typography>}
                <div style = {{float: "left", fontSize: "13px", fontWeight: "500"}}>{card.user.firstName} {card.user.lastName} </div>
                <div style = {{float: "left", marginLeft: "8px", fontSize: "13px"}}>posted <time class="timeago" dateTime={toJSDate(card.createdAt)} title={toJSDate(card.createdAt)}>{timeSince(toJSDate(card.createdAt))}</time> ago</div>
                <br></br>
                  </Col>
                  <Col xs={2}>
                {/* if isAdmin or wrote the comment? Simplifief to if admin */}
                {this.props.isAdmin && !card.deleted
                ? <IconButton onClick={() => this.handleDelete(card.blogCommentId)} aria-label="delete" variant="contained" size="small" style={{padding:"0", marginRight:"0px", marginLeft:"60px"}}><RemoveCircleOutlineIcon style={{fontSize: "15px"}}/></IconButton>
                : null}
                  </Col>
                </Row>
              </CardContent>
            ))}
          </div>
        ) : (
          <Container
            style={{
              Width: "100%",
              Height: "20x",
            }}
            maxWidth="md"
          >
            <bold>No comments yet...</bold>
          </Container>
        )}
      </div>
    );
  }

  deleteBlogComment = (auth, groupId, blogId, commentId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/blog/" + blogId + "/comments/" + commentId;
      fetch(url, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }).then((response) => {
        if (response.status <= 201) {
          console.log("success");
          this.setAsDeleted(commentId);
        } else {
          console.log("failed :(", response.status);
        }
      });
    }, 0);
  };

  setAsDeleted = (blogCommentId) => {
    var commentData = this.props.commentData
    for(var i = 0; i<commentData.length; i++) {
      if (commentData[i].blogCommentId === blogCommentId) {
        commentData[i].deleted = true
        break
      }
    }

    this.setState({
      commentData: commentData
    })
  }

}

export default BlogComments;
