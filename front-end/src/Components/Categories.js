import { React, Component } from 'react';
import { Groups } from './Groups';
import './Survey';
import { Search } from './SearchBar';
import { Typography, Grid, Container, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
// shows all categories
// export class Categories extends Component {

// loads the categories to display for the user
// inputs: none
// outputs: list of categories to display
// categoryLoader() {
//     return listOfCategories;
// }


// // loads the categories to display that match the search phrase
// // inputs: search string
// // outputs: list of categories to display that start with the same search phrase
// categorySearch(search) {
//     return listOfSearchCategories;
// }


// returns the view for the categories page
// loads list of categories - navigates to the categories group page if clicked on
//     render() {
//         return(
//         <div>
//             <p>CHECKKKKKKKKKKKKKKKKK</p>
//         </div>);

//     }
// }

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGroups: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount () {
    this.getCategories()
    console.log(this.getCookie("access_token"))
  }

  onClick() {
    this.setState({
      showGroups: true,
    });
  }


  render() {
    let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    if (this.state.showGroups) {
          return (<Redirect to="/groups" />)
  }

    return (
<div>
        <Container maxWidth="md">
          <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
            Categories
            </Typography>
          < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
          < Search />
        </Container>
        <Container style={{ padding: "3.5rem 0" }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    style={{ paddingTop: '56.25%' }}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Category Name
                    </Typography>
                    <Typography>
                      Category Desc
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={this.onClick}>
                      View
                    </Button>
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
    for(var i = 0; i <ca.length; i++) {
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

  getCategories = () => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/categories"
      fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ''
        }
      })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data)
          })
        } else {
          console.log("failed :(")
        }
      })
    }, 0)
  }

  saveCategory = (auth, categoryId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/categories/" + categoryId
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

  unsaveCategory = (auth, categoryId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/categories/" + categoryId
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

  createGroup = (auth, categoryId, groupName, groupDescription) => {
    var body = 
    {
      "category":{
         "categoryId": categoryId
      },
      "groupName": groupName,
      "groupDescription": groupDescription
   }
  
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups"
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

  getGroup = (auth, groupId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId
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

  saveGroup = (auth, groupId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId
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

  unsaveGroup = (auth, groupId) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/groups/" + groupId
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

  searchGroups = (auth, categoryId, page, query) => {
    setTimeout(() => {
      var url = "https://groups.cahillaw.me/v1/search?"
      if (categoryId !== '') {
        url = url + "category=" + categoryId
      }

      if (page !== '') {
        if (url.charAt(url.length-1) === '?' || url.charAt(url.length-1) === '&') {
          url = url + '&'
        }
        url = url + "page=" + page
      }

      if (query !== '') {
        if (url.charAt(url.length-1) === '?' || url.charAt(url.length-1) === '&') {
          url = url + '&'
        }
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

  createGroupComment = (auth, groupId, commentContent, replyId) => {
    setTimeout(() => {
      if (replyId > 0) {
        var body = 
          {
            "replyId":{
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
            "replyId":{
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

