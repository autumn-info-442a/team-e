import React from 'react'
import { GetCookie } from '../GetCookie'
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
    TextareaAutosize
  } from "@material-ui/core";
  import Alert from '@material-ui/lab/Alert';
  import { Redirect } from "react-router-dom";

class NewGroup extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
          auth: '0',
          showError: false,
          errorMessage: '',
          groupName: '',
          groupDesc: '',
          categoryId: 0
      }
    }

    componentDidMount () {
        var auth = GetCookie("access_token")
        this.getCategories(auth, '')
        this.setState({
            auth: auth
        })
    }

    createGroup = (auth, categoryId, groupName, groupDescription) => {
        console.log(parseInt(categoryId, 10))
        
        var body =
        {
            "category": {
            "categoryId": parseInt(categoryId, 10)
            },
            "groupName": groupName,
            "groupDescription": groupDescription
        }
        
        console.log(body)
        setTimeout(() => {
            var url = "https://groups.cahillaw.me/v1/groups"
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
                    window.location.href = '/group/' + data.groupId
                })
                } else {
                console.log("failed :(", response.status)
                }
            })
        }, 0)
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

       handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            categoryId: event.target.value
        })
      };

      handleGroupNameChange = (event) => {
        console.log(event.target.value)
        this.setState({
            groupName: event.target.value
        })
      };

      handleGroupDescChange = (event) => {
        console.log(event.target.value)
        this.setState({
            groupDesc: event.target.value
        })
      };

      clickSubmitHandler() {
        var errMes = '' 
        if(this.state.groupName.length < 1) {
            this.setState({
                showError: true,
                errorMessage: 'Empty group name'
            })
        } else if (this.state.groupName.length > 32) {
            this.setState({
                showError: true,
                errorMessage: 'Group name must be under 32 characters'
            })
        } else if (this.state.categoryId < 1) {
            this.setState({
                showError: true,
                errorMessage: 'You must select a category'
            })
            errMes = 'You must select a category'
        } else if (this.state.groupDesc.length > 240) {
            this.setState({
                showError: true,
                errorMessage: 'Group description must be under 240 characters'
            })
        } else {
            this.createGroup(this.state.auth, this.state.categoryId, this.state.groupName, this.state.groupDesc)
        }
      }
      
      removeAlert() {
        this.setState({
          showError: false,
          errorMessage: ''
        })
      }

    render = () => {
        const ErrorAlert = () => {
            if(this.state.showError === true) {
              return (
                <Alert severity="error" onClose={() => this.removeAlert()} dismissible>
                  {this.state.errorMessage}
                </Alert>
              )
            } else {
              return null
            }
          }

      if(this.state.auth.length > 1 && this.state.data) {
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
                    Create Group
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
                    <Typography variant="h6" gutterBottom>
                        Group details
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                        <TextField required label="Group name" fullWidth onChange={this.handleGroupNameChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl style={{ width: "100%" }}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select 
                                    requred
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={this.handleChange}
                                    >
                                        {this.state.data.categories.map((card) => (
                                        <MenuItem value={card.categoryId}>{card.categoryName}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <div style={{ marginBottom: "5px" }}>Group description</div>
                        <TextareaAutosize style={{ width: "100%" }} label="Group description" rowsMin={5} fullWidth onChange={this.handleGroupDescChange} />
                        </Grid>
                        <Grid item xs={12}>
                        <Button id = "create" variant= "dark" size= "sm" onClick={() => this.clickSubmitHandler()}>Create Group</Button>
                        <hr></hr>
                        <ErrorAlert></ErrorAlert>
                        </Grid>
                    </Grid>
                </Container>
          </div>
        )
      } 
      
      if (this.state.auth === '') {
        return <Redirect to={{
            pathname: '/'
          }} />
      }

      return (
        <div>
          <h1 id="title">Loading...</h1>
        </div>
      )
    }

}

export default NewGroup