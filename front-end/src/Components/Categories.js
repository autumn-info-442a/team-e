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

}


