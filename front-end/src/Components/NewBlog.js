import React from "react";
import { GetCookie } from "../UtilityFunctions";
import {
  Typography,
  Container,
  Checkbox,
  TextField,
  FormControlLabel,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  TextareaAutosize,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";

export class NewBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "0",
      showError: false,
      errorMessage: "",
      postTitle: "",
      postContent: "",
    };
  }

  componentDidMount() {
    var auth = GetCookie("access_token");
    this.setState({
      auth: auth,
    });
    // var groupId = this.props.groupId;
    // console.log("CHECK", groupId);
  /*  setTimeout(() =>{
      console.log(this.props.data.isAdmin)

    }, 2000)
    */
  }

  handlePostTitleChange = (event) => {
    this.setState({
      postTitle: event.target.value,
    });
  };

  handlePostContentChange = (event) => {
    this.setState({
      postContent: event.target.value,
    });
  };

  clickSubmitHandler() {
    var errMes = "";
    if (this.state.postTitle.length < 1) {
      this.setState({
        showError: true,
        errorMessage: "Empty post title.",
      });
    } else if (this.state.postTitle.length > 150) {
      this.setState({
        showError: true,
        errorMessage: "Post title must be under 150 characters.",
      });
    } else if (this.state.postContent.length > 2000) {
      this.setState({
        showError: true,
        errorMessage: "Post must be under 2000 characters.",
      });
    } else {
      this.createBlogPost(
        this.state.auth,
        this.props.groupId,
        this.state.postTitle,
        this.state.postContent
      );
      console.log(this.props.groupId)
     console.log(this.props.data.isJoined)
     console.log(this.props.data.isAdmin)
    }
  }

  removeAlert() {
    this.setState({
      showError: false,
      errorMessage: "",
    });
  }

  render = () => {
    const ErrorAlert = () => {
      if (this.state.showError === true) {
        return (
          <Alert
            severity="error"
            onClose={() => this.removeAlert()}
            dismissible
          >
            {this.state.errorMessage}
          </Alert>
        );
      } else {
        return null;
      }
    };

    if (this.props.data != '') { 
      return (
        <div>
          {this.props.data.isJoined || this.props.data.isAdmin ? (
            <div>
              <Button style = {{float: "right "}}
                size="medium"
                color="primary"
                onClick={() => this.setState({ showModal: true })}
              >
                Create New Post
              </Button>
              <Dialog
                open={this.state.showModal}
                onClose={() => this.setState({ showModal: false })}
                aria-labelledby="Create Post"
                aria-describedby="simple-modal-description"
              >
                {" "}
                <DialogTitle id="form-dialog-title">Create Post</DialogTitle>
                <DialogContent>
                  <Container maxWidth="lg">
                    <Typography
                      component="h3"
                      align="center"
                      variant="h3"
                      color="textPrimary"
                      gutterBottom
                    >
                      Create Post
                    </Typography>
                    <hr
                      style={{
                        marginTop: "-1rem",
                        backgroundColor: "#3399FF",
                        width: "200px",
                        height: "3px",
                      }}
                    />
                  </Container>
                  <Container style={{ padding: "1.5rem 0" }} maxWidth="md">
                    <Grid container spacing={3}>
                      <TextField
                        required
                        label="Post Title"
                        fullWidth
                        onChange={this.handlePostTitleChange}
                      />
                      <div style={{ margin: "10px 0px 3px 0px" }}>
                        Post Content
                      </div>
                      <TextareaAutosize
                        style={{ width: "100%" }}
                        label="Post Content"
                        rowsMin={5}
                        fullWidth
                        onChange={this.handlePostContentChange}
                      />
                      <Button
                        id="create"
                        variant="dark"
                        size="sm"
                        onClick={() => this.clickSubmitHandler()}
                      >
                        Create Post
                      </Button>
                      <hr></hr>
                      <ErrorAlert></ErrorAlert>
                    </Grid>
                  </Container>
                </DialogContent>
              </Dialog>
            </div>
          ) : null}
        </div>
      );
    } else {
      return null
    }
    //s
  };

  createBlogPost = (auth, groupId, postTitle, postContent) => {
    var body = {
      postTitle: postTitle,
      postContent: postContent,
    };

    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/blog";
      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify(body),
      }).then((response) => {
        if (response.status <= 201) {
          response.json().then((data) => {
            console.log(data);
          });
        } else {
          console.log("failed :(", response.status);
        }
      });
    }, 0);
  };
}
