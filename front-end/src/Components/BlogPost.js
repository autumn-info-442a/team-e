import { React, Component } from 'react';
import { Typography, Paper, Container, Button, Card, CardContent, CardMedia } from '@material-ui/core';

export class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        showComments: true,
    });
  }

  componentDidMount() {
    console.log(this.props.location.state)
    this.setState({
      blogPost: this.props.location.state.blogPost,
      groupData: this.props.location.state.data
    })
  }



  render() {
    if (this.state.blogPost && this.state.groupData) {    
      return (<div>
          <Container maxWidth="md">
            <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
              {this.state.blogPost.postTitle}
              </Typography>
            < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
            <Typography variant="subtitle1" align="center" color="textSecondary">
            {/* {post.date} */}{this.state.blogPost.createdAt}</Typography>
            <Paper variant="elevation" style={{padding: "5px"}}>
            <div style={{width:"100%", marginBottom: "10px"}} ><img style={{ maxHeight: "400px", marginLeft: "auto", marginRight: "auto", display: "block"}} src="https://source.unsplash.com/random" /></div>
            <Typography  component="h5" variant="h5" align="center"  color="textPrimary">
              By User :)
              </Typography>
            <Typography variant="subtitle1" color="textPrimary">
      {/* {post.date} */}{this.state.blogPost.postContent}
            </Typography>
            </Paper>
          </Container>
        </div>
      );
    }

    return null;
  }
}



