import { React, Component } from 'react'
import './UserDashnoard'

class User extends Component {

    // creates a new user
    // input: takes in form content with new user information
    // output: makes request to server to create a new user in the backend
    createUser(newUserFormInfo) {
    }

    // logs in user
    // input: login form content
    // output: request to backend to log in the user
    login(loginForm) {
        // logs in user and redirects to home page
    }

    // logs out user
    // input: userID
    // output: request to backend to log out the user
    logout(userID) {
        // logs out user and redirects to home page
    }

    // edits user info like name, password
    // input: user login information from userInfo function below and the userID
    // output: request to backend to edit user details
    editUser(userInfo, userID) {
        // edits user info and redirects to home page
    }


    // loads all the user information
    // input: user ID
    // output: returns an object with all the user info tabulated below to be stored
    userInfo(userID) {
        joinedGroups; // stores all groups user is in
        savedGroups; // stores all saved groups
        posts; // stores all post IDs posted by user
        comments; // stores list of post IDs user has commented on
        adminGroups; // stores list of group IDs that user is admin of 
        loginInfo; // stores log in information like username and password 

        return userInfo
    }

    // view for user page and for create user 
    render() {

    }
}