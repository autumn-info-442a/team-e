import { React, Component } from "react";
import {
  Typography,
  Grid,
  Container,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { GetCookie } from "../GetCookie";

// loads info through userInfo function from User.js passed in as props
// userInfo returns an object with the user's joined and saved groups, posts and
// comments they're made, which groups they're an admin of, and their login info
export class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var auth = GetCookie("access_token");
    this.getAdminGroups(auth);
  }

  getAdminGroups = (auth) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/admin";

      fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
      }).then((response) => {
        if (response.status <= 201) {
          response.json().then((data) => {
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

  // displays user's joined groups, saved groups, and groups they're admins of
  // also shows option to approve or reject group members for groups user is
  // an admin for.
  render() {
    if (this.state.data) {
        console.log(this.state.data.adminGroups.length)
      return (
        <div>
          <Container maxWidth="lg">
            <Typography
              component="h2"
              align="center"
              variant="h2"
              color="textPrimary"
              gutterBottom
            >
              Dashboard
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
            <Typography
              component="h5"
              align="left"
              variant="h5"
              color="textPrimary"
              style={{ paddingBottom: "10px" }}
            >
              Admin Groups
            </Typography>
            {/* End hero unit */}
            {this.state.data.adminGroups.length > 0 ? <Grid container spacing={4}>{this.state.data.adminGroups.map((card) => (
                <Grid item key={card} xs={6} sm={4} md={4}>
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
                      <Typography gutterBottom variant="h5" component="h2">
                      {card.groupName}
                      </Typography>
                    </CardContent>
                    <CardActions>
                    <Button>
                        <Link
                          to={{
                            pathname: "/group/" + card.groupId,
                            state: {
                              groupId: card.groupId
                            },
                          }}
                        >
                          View{" "}
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}</Grid> : 
                    <Grid xs={6} sm={4} md={4}>
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
                      <Typography gutterBottom variant="h5" component="h2">
                      You have 0 joined groups
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid> }
          </Container>
          <hr
            style={{
              margin: "1rem auto",
              backgroundColor: "#3399FF",
              width: "550px",
              height: "3px",
            }}
          />
          <Container style={{ padding: "1.5rem 0" }} maxWidth="md">
            <Typography
              component="h5"
              align="left"
              variant="h5"
              color="textPrimary"
              style={{ paddingBottom: "10px" }}
            >
              Joined Groups
            </Typography>
            {/* End hero unit */}
            {this.state.data.joinedGroups.length > 0 ? <Grid container spacing={4}>{this.state.data.joinedGroups.map((card) => (
                <Grid item key={card} xs={6} sm={4} md={4}>
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
                      <Typography gutterBottom variant="h5" component="h2">
                      {card.groupName}
                      </Typography>
                    </CardContent>
                    <CardActions>
                    <Button>
                        <Link
                          to={{
                            pathname: "/group/" + card.groupId,
                            state: {
                              groupId: card.groupId
                            },
                          }}
                        >
                          View{" "}
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}</Grid> : 
                    <Grid xs={6} sm={4} md={4}>
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
                      <Typography gutterBottom variant="h5" component="h2">
                      You have 0 joined groups
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid> }
          </Container>
          <hr
            style={{
              margin: "1rem auto",
              backgroundColor: "#3399FF",
              width: "550px",
              height: "3px",
            }}
          />
          <Container style={{ padding: "1.5rem 0" }} maxWidth="md">
            <Typography
              component="h5"
              align="left"
              variant="h5"
              color="textPrimary"
              style={{ paddingBottom: "10px" }}
            >
              Saved Groups
            </Typography>
            {/* End hero unit */}
            {this.state.data.savedGroups.length > 0 ? <Grid container spacing={4}>{this.state.data.savedGroups.map((card) => (
                <Grid item key={card} xs={6} sm={4} md={4}>
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
                      <Typography gutterBottom variant="h5" component="h2">
                      {card.groupName}
                      </Typography>
                    </CardContent>
                    <CardActions>
                    <Button>
                        <Link
                          to={{
                            pathname: "/group/" + card.groupId,
                            state: {
                              groupId: card.groupId
                            },
                          }}
                        >
                          View{" "}
                        </Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}</Grid> : 
                    <Grid xs={6} sm={4} md={4}>
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
                      <Typography gutterBottom variant="h5" component="h2">
                      You have 0 joined groups
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid> }
          </Container>
        </div>
      );
    }
    return (
      <div>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            align="center"
            variant="h2"
            color="textPrimary"
            gutterBottom
          >
            Dashboard
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
        <div>Loading...</div>
      </div>
    );
  }
}
