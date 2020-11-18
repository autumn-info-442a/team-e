import { React, Component } from 'react';
import './Groups';
import './Survey';
import { Search } from './SearchBar';
import { Typography, Grid, Container, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
export default function Categories() {

    const classes = useStyles();
  return (
      <div>
          <Container maxWidth="sm">
            <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
             Categories
            </Typography>
            < hr style={{ marginTop:"-1rem", backgroundColor:"#3399FF", width: "200px", height:"3px"}} />
            < Search />
          </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Group Name
                    </Typography>
                    <Typography>
                      Group description
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Join
                    </Button>
                    <Button size="small" color="primary">
                      Save
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

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));
  
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  