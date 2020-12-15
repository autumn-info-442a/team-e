import React from "react";
import { toJSDate, timeSince } from "../UtilityFunctions";
import {
  Typography,
  Container,
  Button,
  Dialog, 
  DialogContent, CardContent
} from "@material-ui/core";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { Row, Col } from "react-bootstrap";

export class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      showModal: false
    };
  }

  handleDelete(groupCommentId) {
    this.setState({
      showModal: true,
      groupCommentId: groupCommentId
     })
  }

  clickSubmitHandler() {
    this.deletedGroupComment(this.props.auth, this.props.groupId, this.state.groupCommentId)
    this.setState({
      showModal: false,
      groupCommentId: ''
     })
  }

  render() {
    return (
      <div>
        {<Dialog 
              open={this.state.showModal}
              onClose={() => this.setState({ showModal: false })}
              aria-labelledby="Create Group"
              aria-describedby="simple-modal-description"
            >
            <DialogContent>
               <Container maxWidth="lg">
              <Typography component="h5" align="center" variant="h5" color="textPrimary" gutterBottom>
              Are you sure you want to delete the comment?
              </Typography>
              <Button style={{marginLeft: "auto"}} id="delete" variant= "dark" size= "sm" onClick={() => this.clickSubmitHandler()}>Confirm</Button>
              </Container>
              </DialogContent>
              </Dialog > }
        {this.props.commentData && this.props.commentData.length > 0 ? (
          <div>
            {this.props.commentData.map((card) => (
              
              <CardContent
                style={{ padding: "5px", borderBottom: "0.5px solid #ebebeb" }}
              >
                {console.log("CARD", card)}
                 <Row>
                  <Col xs={10}>
                  <Typography
                  component="p"
                  variant="p"
                  style={{ fontSize: "15px" }}
                >
                  {card.commentContent}
                </Typography>
                <div style = {{float: "left", fontSize: "13px", fontWeight: "500"}}>{card.user.firstName} {card.user.lastName} </div>
                <div style = {{float: "left", marginLeft: "8px", fontSize: "13px"}}>posted <time class="timeago" dateTime={toJSDate(card.createdAt)} title={toJSDate(card.createdAt)}>{timeSince(toJSDate(card.createdAt))}</time> ago</div>
                <br></br>
                  </Col>
                  <Col xs={2}>
                {/* if isAdmin or wrote the comment? Simplifief to if admin */}
                {this.props.isAdmin
                ? <IconButton onClick={() => this.handleDelete(card.groupCommentId)} aria-label="delete" variant="contained" size="small" style={{padding:"0", marginRight:"0px", marginLeft:"60px"}}><RemoveCircleOutlineIcon style={{fontSize: "15px"}}/></IconButton>
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

  deletedGroupComment = (auth, groupId, commentId) => {
    setTimeout(() => {
      var url =
        "https://groups.cahillaw.me/v1/groups/" +
        groupId +
        "/comments/" +
        commentId;
      fetch(url, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }).then((response) => {
        if (response.status <= 201) {
          console.log("success");
        } else {
          console.log("failed :(", response.status);
        }
      });
    }, 0);
  };
}

export default Comment;
