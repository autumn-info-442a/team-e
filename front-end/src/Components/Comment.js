import React from 'react'
import { GetCookie } from '../GetCookie'
import { Container } from '@material-ui/core';
export class Comment extends React.Component {
    constructor (props) {
      super(props)
      this.state = {

      }
    }

    componentDidMount () {

    }

    render = () => {

        return (
            <Container style={{
                Width: "100%",
                Height: "20x",
              }} maxWidth="md"> 
              <h1 id="title">Loading...</h1>
            </Container>
          )
    }

}

export default Comment
