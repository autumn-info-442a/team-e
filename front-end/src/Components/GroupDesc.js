import { React, Component } from "react";
import {
  Typography,
  Paper,
  Grid,
  Container,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Hidden,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextareaAutosize
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import { GetCookie } from "../GetCookie";
import { GroupPage } from "./GroupPage";
import NewComment from "./NewComment";
import Comment from "./Comment"
import { NewBlog } from "./NewBlog";

// shows details in the dashboard for individual groups
export class GroupDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "home",
      newComment: '',
      data: ''
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    var auth = GetCookie("access_token");
    console.log(auth);
    var groupId = this.props.location.pathname.split("/", 3)[2];
    this.getGroup(auth, groupId);
    this.setState({
      auth: auth,
      groupId: groupId
    })
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
  }

  handleNewTLCommentChange = (event) => {
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
      this.createGroupComment(this.state.auth, this.state.data.groupId, this.state.newComment, 0)
    }
  }


  // loads the group info about the group
  // gets group name as prop from Groups
  // shows edit and accept options if user is admin
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

    if (this.state.data != '') {
      let cards = [1, 2, 3, 4];
      return (
        <div>
          <Container maxWidth="md">
            <Typography
              component="h2"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {this.state.data.groupName}
            </Typography>
            <hr
              style={{
                marginTop: "-1rem",
                backgroundColor: "#3399FF",
                width: "200px",
                height: "3px",
              }}
            />
            <Paper variant="elevation" style={{ padding: "5px" }}>
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.value}
                onSelect={(k) => this.handleChange(k)}
              >
                <Tab eventKey="home" title="Group Description">
                  <Row>
                    <Col className="pt-2 pl-3">
                      <div style={{ width: "100%", marginBottom: "5px", marginLeft:"5px" }}>
                        <img
                          style={{
                            maxWidth: "500px",
                            maxHeight: "400px",
                            display: "block",
                           
                          }}
                          src="https://source.unsplash.com/random"
                        />
                      </div>
                    </Col>
                    <Col className="mt-5 p-3">
                      <Typography
                        component="h6"
                        variant="h6"
                        align="left"
                        color="textSecondary"
                      >
                       {this.state.data.groupDescription === "" ? "No group description." : this.state.data.groupDescription}
                      </Typography>
                      <Typography variant="subtitle1" color="textPrimary">
                        Created on: {Date(this.state.data.createdAt).substring(0, 16)}
                      </Typography>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <br></br>
                      <Typography variant="subtitle1" color="textPrimary">
                        Leave a comment
                        </Typography>
                      <TextareaAutosize style={{ width: "100%" }} label="top level comment" rowsMin={3} onChange={this.handleNewTLCommentChange} />
                      <Button style={{ marginBottom: "15px" }} size="medium" color="primary" onClick={() => this.clickSubmitHandler()}>Create Comment</Button>
                      <ErrorAlert></ErrorAlert>
                      <hr
                        style={{
                          marginTop: "-10px",
                        }}
                      />
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
                      {/* LOAD IN GROUP COMMENTS HERE 
                        
                         <NewComment groupId={this.state.data.groupId} /> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Comment auth={this.state.auth} groupId={this.state.groupId} />
            
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="blog" title="Blog Posts">
                  <NewBlog
                   groupId={this.state.groupId}
                   data = {this.state.data}/>
                  <GroupPage/>
                </Tab>
                {this.state.data.isAdmin ? <Tab eventKey="profile" title="Member Requests">
                <div style={{padding: "8px", minHeight:"500px"}}>
                  <Grid container spacing={4}>
                    {cards.map((card) => (
                      <Grid item key={card} xs={4} sm={3} md={3}>
                        <Card
                          style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardMedia
                            style={{ paddingTop: "56.25%" }}
                            image="https://source.unsplash.com/random"
                            title="Image title"
                          />
                          <CardContent style={{ flexGrow: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              Name
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              color="primary"
                              onClick={this.onClick}
                            >
                              Accept
                            </Button>
                            <Button
                              size="small"
                              color="primary"
                              onClick={this.onClick}
                            >
                              Reject
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  </div>
                </Tab> : null}
              </Tabs>
            </Paper>
          </Container>
        </div>
      );
    }

    return null;
  }


  createGroupComment = (auth, groupId, commentContent, replyId) => {
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

      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/comments"
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

  getGroup = (auth, groupId) => {
    setTimeout(() => {
      console.log(auth);
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId;
      fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }).then((response) => {
        if (response.status <= 201) {
          response.json().then((data) => {
            console.log(data);
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

}
