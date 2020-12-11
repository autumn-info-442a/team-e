import React from "react";
import { GetCookie } from "../GetCookie";
import { Container, Typography, CardContent } from "@material-ui/core";

export class BlogComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  componentDidMount() {
    this.getBlogComments(this.props.auth, this.props.groupData.groupId, this.props.blogPost.blogPostId, 1);
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
                <Typography
                  component="p"
                  variant="p"
                  style={{ fontSize: "15px" }}
                >
                  {card.commentContent}
                </Typography>
                <div style = {{float: "left", fontSize: "13px", fontWeight: "500"}}>{card.user.firstName} {card.user.lastName} </div>
                <div style = {{float: "left", marginLeft: "8px", fontSize: "13px"}}>{Date(card.createdAt).substring(0, 16)}</div>
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
}

export default BlogComments;
