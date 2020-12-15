import React from "react";
import { Container, Typography, CardContent} from "@material-ui/core";
import { toJSDate, timeSince } from "../UtilityFunctions";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { Row, Col } from "react-bootstrap";

export class BlogComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  componentDidMount() {
    console.log("POST", this.props.blogPost);
    this.getBlogComments(this.props.auth, this.props.groupData.groupId, this.props.blogPost.blogPostId, 1);
  }

  handleDelete() {

  }

  render() {
    return (
      <div>
        {this.state.data ? (
          <div>
            {this.state.data.map((card) => (
              <CardContent key={card.blogCommentId}
                style={{ padding: "5px", borderBottom: "0.5px solid #ebebeb" }}
              >
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
                ? <IconButton onClick={() => this.handleDelete()} aria-label="delete" variant="contained" size="small" style={{padding:"0", marginRight:"0px", marginLeft:"60px"}}><RemoveCircleOutlineIcon style={{fontSize: "15px"}}/></IconButton>
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
            <h4 id="title">No comments yet...</h4>
          </Container>
        )}
      </div>
    );
  }

  getBlogComments = (auth, groupId, blogId, page) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/blog/" + blogId + "/comments?"
      if (page !== '') {
        url = url + "page=" + page
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
                this.setState({
                    data: data
                })
              console.log(data)
            })
          } else {
            console.log("failed :(")
          }
        })
    }, 0)
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
        } else {
          console.log("failed :(", response.status);
        }
      });
    }, 0);
  };

}

export default BlogComments;
