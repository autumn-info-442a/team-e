import { React, Component } from 'react'
import { Typography, Paper, Grid, Container, Button, Card, CardActionArea, CardContent, CardMedia, Hidden, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import { Row, Tab, Tabs } from 'react-bootstrap';
import { ExpandMore } from '@material-ui/icons';
import { BlogPost } from "./BlogPost";
import { Redirect } from 'react-router-dom'
// shows details in the dashboard for individual groups
export class GroupDesc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
        this.onClick = this.onClick.bind(this);
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
    };

    // loads the group info about the group
    // gets group name as prop from Groups
    // shows edit and accept options if user is admin
    render() {
        let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return (<div>
                    <Container maxWidth="md">
                        <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Group DESCRIPTION
                </Typography>
                        < hr style={{ marginTop: "-1rem", backgroundColor: "#3399FF", width: "200px", height: "3px" }} />
                        <Paper variant="elevation" style={{padding: "5px"}}>
                        <Tabs
      id="controlled-tab-example"
      activeKey={this.state.value}
      onSelect={(k) => this.handleChange(k)}
    >
      <Tab eventKey="home" title="Home">
  <p>Change</p>
      </Tab>
      <Tab eventKey="profile" title="Profile">
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
      </Tab>
    </Tabs>

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