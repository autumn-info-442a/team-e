import { React, Component } from 'react';
import { Groups } from './Groups';
import './Survey';
import { Search } from './SearchBar';
import { Typography, Grid, Container, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import SearchBar from "material-ui-search-bar";

// try using withRouter later
// history cant be called inside class!
// 
export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGroups: false,
      categoryId: 0,
      query: ''
    };
    this.goToGroupsPage = this.goToGroupsPage.bind(this);
  }

  componentDidMount() {
    var auth = this.getCookie("access_token")
    console.log(auth)
    this.setState({
      auth: auth
    })
    this.getCategories(auth, '');
  }

  goToGroupsPage(categoryId) {
    this.setState({
      categoryId: categoryId,
      showGroups: true
    });
    // let history = useHistory();
    // history.push("/groups")
  }

  // onSaveClick(categoryID) {
  //   this.saveCategory(auth, categoryID)
  // }


  render() {
    if (this.state.showGroups) {
      console.log(this.state.categoryId)
      return <Link to={{
        pathname: '/groups',
        state: {
          auth: this.state.auth,
          categoryId: this.state.categoryId
        }
      }} />
    }
    return (
      <div>
        <Container maxWidth="md">
          <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
            Categories
            </Typography>
          < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
          <SearchBar
            value={this.state.query}
            onChange={(newValue) => this.setState({ query: newValue })}
            onRequestSearch={() => this.getCategories(this.state.auth, this.state.query)}
            />
        </Container>
        <Container style={{ padding: "3.5rem 0" }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {this.state.data != undefined && this.state.data.categories.map((card) => (
              <Grid item key={card.categoryId} xs={12} sm={6} md={4}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    style={{ paddingTop: '56.25%' }}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.categoryName}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button ><Link to={{
                        pathname: '/groups',
                        state: {
                          auth: this.state.auth,
                          categoryId: card.categoryId
                        }
                      }}>View </Link></Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }

  //from: https://www.w3schools.com/js/js_cookies.asp
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return ""
  }

  getCategories = (auth, query) => {
    setTimeout(() => {   
      var url = "https://groups.cahillaw.me/v1/categories?"
      if (query !== '') {
        url = url + "query=" + query
      }
      fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              this.setState({
                data: data
              })
            })     
          } else {
            console.log("failed :(")
          }
        })
    }, 0)
  }

  // saveCategory = (auth, categoryId) => {
  //   setTimeout(() => {
  //     var url = "https://groups.cahillaw.me/v1/categories/" + categoryId
  //     fetch(url, {
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': auth
  //       }
  //     })
  //       .then((response) => {
  //         if (response.status <= 201) {
  //           console.log("success")
  //         } else {
  //           console.log("failed :(", response.status)
  //         }
  //       })
  //   }, 0)
  // }

  // unsaveCategory = (auth, categoryId) => {
  //   setTimeout(() => {
  //     var url = "https://groups.cahillaw.me/v1/categories/" + categoryId
  //     fetch(url, {
  //       method: 'delete',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': auth
  //       }
  //     })
  //       .then((response) => {
  //         if (response.status <= 201) {
  //           console.log("success")
  //         } else {
  //           console.log("failed :(", response.status)
  //         }
  //       })
  //   }, 0)
  // }


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
        body: body
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

  getGroupComments = (auth, groupId, page) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/comments?"
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
              console.log(data)
            })
          } else {
            console.log("failed :(")
          }
        })
    }, 0)
  }

  deletedGroupComment = (auth, groupId, commentId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/comments/" + commentId
      fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      })
        .then((response) => {
          if (response.status <= 201) {
            console.log("success")
          } else {
            console.log("failed :(", response.status)
          }
        })
    }, 0)
  }

  createBlogPost = (auth, groupId, postTitle, postContent) => {
    var body =
    {
      "postTitle": postTitle,
      "postContent": postContent
    }

    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/blog"
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        },
        body: body
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

  deletedBlogPost = (auth, groupId, blogId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/blog/" + blogId
      fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      })
        .then((response) => {
          if (response.status <= 201) {
            console.log("success")
          } else {
            console.log("failed :(", response.status)
          }
        })
    }, 0)
  }

  getMembersipRequests = (auth, groupId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/requests"

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
              console.log(data)
            })
          } else {
            console.log("failed :(")
          }
        })
    }, 0)
  }

  createMembershipRequest = (auth, groupId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/requests"
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      })
        .then((response) => {
          if (response.status <= 201) {
            console.log("success")
          } else {
            console.log("failed :(", response.status)
          }
        })
    }, 0)
  }

  acceptMembershipRequest = (auth, groupId, requestId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/requests/" + requestId
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      })
        .then((response) => {
          if (response.status <= 201) {
            console.log("success")
          } else {
            console.log("failed :(", response.status)
          }
        })
    }, 0)
  }

  deletedBlogPost = (auth, groupId, requestId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/requests/" + requestId
      fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      })
        .then((response) => {
          if (response.status <= 201) {
            console.log("success")
          } else {
            console.log("failed :(", response.status)
          }
        })
    }, 0)
  }

  getAdminGroups = (auth) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/admin"

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
              console.log(data)
            })
          } else {
            console.log("failed :(")
          }
        })
    }, 0)
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
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        },
        body: body
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

  getBlogComments = (auth, groupId, blogId, page) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/blog/" + blogId + "/comments"
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
              console.log(data)
            })
          } else {
            console.log("failed :(")
          }
        })
    }, 0)
  }

  deletedBlogComment = (auth, groupId, blogId, commentId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId + "/blog/" + blogId + "/comments/" + commentId
      fetch(url, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
      })
        .then((response) => {
          if (response.status <= 201) {
            console.log("success")
          } else {
            console.log("failed :(", response.status)
          }
        })
    }, 0)
  }
}

