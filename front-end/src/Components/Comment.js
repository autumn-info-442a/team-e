import React from "react";
import { toJSDate, timeSince } from "../UtilityFunctions";
import { Container, Typography, CardContent } from "@material-ui/core";
export class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  componentDidMount() {
    this.getGroupComments(this.props.auth, this.props.groupId, 1);
  }

  render() {
    return (
      <div>
        {this.state.data ? (
          <div>
            {this.state.data.map((card) => (
              <CardContent
                style={{ padding: "5px", borderBottom: "0.5px solid #ebebeb" }}
              >
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

  getGroupComments = (auth, groupId, page) => {
    setTimeout(() => {
      var url =
        "https://groups.cahillaw.me/v1/groups/" + groupId + "/comments?";
      if (page !== "") {
        url = url + "page=" + page;
      }

      fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }).then((response) => {
        if (response.status <= 201) {
          response.json().then((data) => {
            console.log("GET COMMENTS", data);
            this.setState({
              data: data,
            });
          });
        } else {
          console.log("failed :(");
        }
      });
    }, 0);
  };

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
