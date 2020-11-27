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


  render() {
    return (<div>
        <Container maxWidth="md">
          <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
            Blog Title 
            </Typography>
          < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
          <Typography variant="subtitle1" align="center" color="textSecondary">
           {/* {post.date} */}date/12/23</Typography>
           <Paper variant="elevation" style={{padding: "5px"}}>
           <div style={{width:"100%", marginBottom: "10px"}} ><img style={{ maxHeight: "400px", marginLeft: "auto", marginRight: "auto", display: "block"}} src="https://source.unsplash.com/random" /></div>
           <Typography  component="h5" variant="h5" align="center"  color="textPrimary">
            Blog Sub-title 
            </Typography>
           <Typography variant="subtitle1" color="textPrimary">
           {/* {post.date} */}blog blog post post post post ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobpost post post post ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lob
           post post post post ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lob
           </Typography>
           </Paper>
        </Container>
      </div>
    );
  }
}


